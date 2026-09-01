package com.example.fidel.audio

import android.content.Context
import android.media.AudioAttributes
import android.media.MediaPlayer
import android.net.ConnectivityManager
import android.net.NetworkCapabilities
import android.os.Build
import android.os.VibrationEffect
import android.os.Vibrator
import android.os.VibratorManager
import android.speech.tts.TextToSpeech
import android.speech.tts.UtteranceProgressListener
import android.util.Log
import com.example.fidel.model.AudioState
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.launch
import java.net.URLEncoder
import java.util.Locale

class SpeechService(private val context: Context) : TextToSpeech.OnInitListener {

    private val _audioState = MutableStateFlow(AudioState())
    val audioState: StateFlow<AudioState> = _audioState.asStateFlow()

    private var tts: TextToSpeech? = null
    private var mediaPlayer: MediaPlayer? = null
    private var isTtsInitialized = false
    private val scope = CoroutineScope(Dispatchers.Main)

    private val vibrator: Vibrator? = if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.S) {
        val manager = context.getSystemService(Context.VIBRATOR_MANAGER_SERVICE) as? VibratorManager
        manager?.defaultVibrator
    } else {
        @Suppress("DEPRECATION")
        context.getSystemService(Context.VIBRATOR_SERVICE) as? Vibrator
    }

    init {
        try {
            tts = TextToSpeech(context.applicationContext, this)
        } catch (e: Exception) {
            Log.e("SpeechService", "Error initializing TTS", e)
        }
        checkConnectivity()
    }

    override fun onInit(status: Int) {
        if (status == TextToSpeech.SUCCESS) {
            isTtsInitialized = true
            val amharicLocale = Locale("am", "ET")
            val langResult = tts?.isLanguageAvailable(amharicLocale)
            val hasAmharic = langResult == TextToSpeech.LANG_AVAILABLE ||
                    langResult == TextToSpeech.LANG_COUNTRY_AVAILABLE ||
                    langResult == TextToSpeech.LANG_COUNTRY_VAR_AVAILABLE

            if (hasAmharic) {
                tts?.language = amharicLocale
            }
            tts?.setSpeechRate(0.85f)
            tts?.setPitch(1.0f)

            tts?.setOnUtteranceProgressListener(object : UtteranceProgressListener() {
                override fun onStart(utteranceId: String?) {
                    _audioState.value = _audioState.value.copy(
                        isSpeaking = true,
                        isPlayingOnline = false
                    )
                }

                override fun onDone(utteranceId: String?) {
                    _audioState.value = _audioState.value.copy(
                        isSpeaking = false,
                        activeWord = null
                    )
                }

                @Deprecated("Deprecated in Java")
                override fun onError(utteranceId: String?) {
                    handleTtsError()
                }

                override fun onError(utteranceId: String?, errorCode: Int) {
                    handleTtsError()
                }
            })

            _audioState.value = _audioState.value.copy(
                hasNativeVoice = hasAmharic
            )
        } else {
            _audioState.value = _audioState.value.copy(
                hasNativeVoice = false
            )
        }
    }

    private fun handleTtsError() {
        val currentWord = _audioState.value.activeWord
        if (currentWord != null && _audioState.value.isOnline) {
            scope.launch {
                speakOnline(currentWord)
            }
        } else {
            _audioState.value = _audioState.value.copy(
                isSpeaking = false,
                activeWord = null
            )
        }
    }

    fun checkConnectivity(): Boolean {
        val connectivityManager = context.getSystemService(Context.CONNECTIVITY_SERVICE) as? ConnectivityManager
        val network = connectivityManager?.activeNetwork
        val capabilities = connectivityManager?.getNetworkCapabilities(network)
        val online = capabilities?.hasCapability(NetworkCapabilities.NET_CAPABILITY_INTERNET) == true
        _audioState.value = _audioState.value.copy(isOnline = online)
        return online
    }

    fun toggleForceOnline(): Boolean {
        val next = !_audioState.value.forceOnline
        _audioState.value = _audioState.value.copy(forceOnline = next)
        return next
    }

    fun vibrate(milliseconds: Long = 20) {
        try {
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
                vibrator?.vibrate(VibrationEffect.createOneShot(milliseconds, VibrationEffect.DEFAULT_AMPLITUDE))
            } else {
                @Suppress("DEPRECATION")
                vibrator?.vibrate(milliseconds)
            }
        } catch (_: Exception) { }
    }

    fun stop() {
        try {
            tts?.stop()
        } catch (_: Exception) { }

        try {
            mediaPlayer?.stop()
            mediaPlayer?.release()
        } catch (_: Exception) { }
        mediaPlayer = null

        _audioState.value = _audioState.value.copy(
            isSpeaking = false,
            isPlayingOnline = false,
            activeWord = null
        )
    }

    fun speak(text: String) {
        if (text.isBlank()) return
        val clean = text.trim()

        vibrate(15)
        stop()
        checkConnectivity()

        _audioState.value = _audioState.value.copy(
            isSpeaking = true,
            activeWord = clean
        )

        val state = _audioState.value
        if (state.forceOnline || !state.hasNativeVoice) {
            if (state.isOnline) {
                speakOnline(clean)
            } else if (isTtsInitialized) {
                speakNative(clean)
            } else {
                _audioState.value = _audioState.value.copy(isSpeaking = false, activeWord = null)
            }
        } else {
            speakNative(clean)
        }
    }

    private fun speakNative(text: String) {
        val params = android.os.Bundle()
        val utteranceId = "fidel_${System.currentTimeMillis()}"
        val result = tts?.speak(text, TextToSpeech.QUEUE_FLUSH, params, utteranceId)
        if (result != TextToSpeech.SUCCESS) {
            if (_audioState.value.isOnline) {
                speakOnline(text)
            } else {
                _audioState.value = _audioState.value.copy(isSpeaking = false, activeWord = null)
            }
        }
    }

    private fun speakOnline(text: String) {
        _audioState.value = _audioState.value.copy(
            isSpeaking = true,
            isPlayingOnline = true,
            activeWord = text
        )

        scope.launch(Dispatchers.IO) {
            try {
                val encoded = URLEncoder.encode(text, "UTF-8")
                val url = "https://translate.google.com/translate_tts?ie=UTF-8&q=$encoded&tl=am&client=tw-ob"

                val player = MediaPlayer().apply {
                    setAudioAttributes(
                        AudioAttributes.Builder()
                            .setContentType(AudioAttributes.CONTENT_TYPE_SPEECH)
                            .setUsage(AudioAttributes.USAGE_ASSISTANCE_ACCESSIBILITY)
                            .build()
                    )
                    setDataSource(url)
                    setOnPreparedListener { mp ->
                        mp.start()
                    }
                    setOnCompletionListener { mp ->
                        mp.release()
                        mediaPlayer = null
                        _audioState.value = _audioState.value.copy(
                            isSpeaking = false,
                            isPlayingOnline = false,
                            activeWord = null
                        )
                    }
                    setOnErrorListener { mp, _, _ ->
                        mp.release()
                        mediaPlayer = null
                        _audioState.value = _audioState.value.copy(
                            isSpeaking = false,
                            isPlayingOnline = false,
                            activeWord = null
                        )
                        true
                    }
                    prepareAsync()
                }
                mediaPlayer = player
            } catch (e: Exception) {
                Log.e("SpeechService", "Online TTS playback failed", e)
                _audioState.value = _audioState.value.copy(
                    isSpeaking = false,
                    isPlayingOnline = false,
                    activeWord = null
                )
            }
        }
    }

    fun release() {
        try {
            tts?.stop()
            tts?.shutdown()
        } catch (_: Exception) { }
        tts = null

        try {
            mediaPlayer?.release()
        } catch (_: Exception) { }
        mediaPlayer = null
    }
}
