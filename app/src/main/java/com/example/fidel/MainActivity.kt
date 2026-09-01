package com.example.fidel

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.material3.Surface
import androidx.compose.ui.Modifier
import com.example.fidel.audio.SpeechService
import com.example.fidel.ui.FidelWorkbookScreen
import com.example.fidel.ui.theme.FidelPracticeTheme
import com.example.fidel.ui.theme.PaperBg
import com.example.fidel.viewmodel.FidelViewModel

class MainActivity : ComponentActivity() {

    private lateinit var speechService: SpeechService
    private lateinit var viewModel: FidelViewModel

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()

        speechService = SpeechService(this)
        viewModel = FidelViewModel(speechService)

        setContent {
            FidelPracticeTheme {
                Surface(
                    modifier = Modifier.fillMaxSize(),
                    color = PaperBg
                ) {
                    FidelWorkbookScreen(viewModel = viewModel)
                }
            }
        }
    }

    override fun onDestroy() {
        super.onDestroy()
        speechService.release()
    }
}
