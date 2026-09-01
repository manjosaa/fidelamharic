package com.example.fidel.viewmodel

import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.graphics.Color
import androidx.lifecycle.ViewModel
import com.example.fidel.audio.SpeechService
import com.example.fidel.data.FIDEL_DATA
import com.example.fidel.model.DrawingPath
import com.example.fidel.model.FidelFamily
import com.example.fidel.model.HuntWordItem
import com.example.fidel.model.Language
import com.example.fidel.model.VocabItem
import com.example.fidel.ui.theme.InkDark
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlin.random.Random

enum class SequenceVerdict {
    IDLE, CORRECT, WRONG
}

data class FidelUiState(
    val currentFidel: FidelFamily = FIDEL_DATA[0],
    val language: Language = Language.FR,
    val showKey: Boolean = false,
    val isVoiceHelpOpen: Boolean = false,
    val missingIndex: Int = 0,
    val sequenceInputVal: String = "",
    val sequenceVerdict: SequenceVerdict = SequenceVerdict.IDLE,
    val sequenceOptions: List<String> = emptyList(),
    val matchWords: List<VocabItem> = emptyList(),
    val shuffledMeanings: List<VocabItem> = emptyList(),
    val selectedWordIndex: Int? = null,
    val userMatches: Map<Int, Int> = emptyMap(),
    val isMatchSubmitted: Boolean = false,
    val huntWords: List<HuntWordItem> = emptyList(),
    val circledIndices: Set<Int> = emptySet(),
    val activeTracingIndex: Int = 0,
    val penColor: Color = InkDark,
    val strokeWidth: Float = 12f,
    val isEraser: Boolean = false,
    val drawingPaths: List<DrawingPath> = emptyList(),
    val currentStroke: List<Offset> = emptyList()
)

class FidelViewModel(val speechService: SpeechService) : ViewModel() {

    private val _uiState = MutableStateFlow(FidelUiState())
    val uiState: StateFlow<FidelUiState> = _uiState.asStateFlow()

    init {
        generateSheet(FIDEL_DATA[0])
    }

    fun selectFidel(fidel: FidelFamily) {
        speechService.speak(fidel.base)
        _uiState.value = _uiState.value.copy(
            currentFidel = fidel,
            activeTracingIndex = 0,
            drawingPaths = emptyList(),
            currentStroke = emptyList()
        )
        generateSheet(fidel)
    }

    fun toggleLanguage() {
        val next = if (_uiState.value.language == Language.FR) Language.EN else Language.FR
        _uiState.value = _uiState.value.copy(language = next)
    }

    fun toggleShowKey() {
        val nextShow = !_uiState.value.showKey
        val state = _uiState.value

        if (nextShow) {
            // Auto fill answers
            val correctSeq = state.currentFidel.forms.getOrNull(state.missingIndex) ?: ""
            val autoMatches = mutableMapOf<Int, Int>()
            state.matchWords.forEachIndexed { idx, item ->
                val matchIdx = state.shuffledMeanings.indexOfFirst { it.word == item.word }
                if (matchIdx != -1) autoMatches[idx] = matchIdx
            }

            _uiState.value = state.copy(
                showKey = true,
                sequenceInputVal = correctSeq,
                sequenceVerdict = SequenceVerdict.CORRECT,
                userMatches = autoMatches,
                isMatchSubmitted = true
            )
        } else {
            _uiState.value = state.copy(
                showKey = false
            )
        }
    }

    fun setVoiceHelpOpen(open: Boolean) {
        _uiState.value = _uiState.value.copy(isVoiceHelpOpen = open)
    }

    fun randomizeSheet() {
        generateSheet(_uiState.value.currentFidel)
    }

    private fun generateSheet(fidel: FidelFamily) {
        val newMissing = Random.nextInt(0, 7)
        val options = fidel.forms.shuffled()

        // 2. Match words
        val matchCount = minOf(4, fidel.vocab.size)
        val chosenMatch = fidel.vocab.shuffled().take(matchCount)
        val shuffledMeanings = chosenMatch.shuffled()

        // 3. Hunt words
        val targetCount = minOf(5, fidel.vocab.size)
        val targetWords = fidel.vocab.shuffled().take(targetCount).map {
            HuntWordItem(it.form, it.word, it.translit, it.fr, it.en, isTarget = true)
        }

        val otherVocabPool = FIDEL_DATA
            .filter { it.base != fidel.base }
            .flatMap { it.vocab }
        val distractorWords = otherVocabPool.shuffled().take(5).map {
            HuntWordItem(it.form, it.word, it.translit, it.fr, it.en, isTarget = false)
        }

        val allHunt = (targetWords + distractorWords).shuffled()

        _uiState.value = _uiState.value.copy(
            missingIndex = newMissing,
            sequenceInputVal = "",
            sequenceVerdict = SequenceVerdict.IDLE,
            sequenceOptions = options,
            matchWords = chosenMatch,
            shuffledMeanings = shuffledMeanings,
            selectedWordIndex = null,
            userMatches = emptyMap(),
            isMatchSubmitted = false,
            huntWords = allHunt,
            circledIndices = emptySet(),
            showKey = false
        )
    }

    // --- Sequence Quiz Actions ---
    fun refreshSequenceQuiz() {
        val nextMissing = Random.nextInt(0, 7)
        _uiState.value = _uiState.value.copy(
            missingIndex = nextMissing,
            sequenceInputVal = "",
            sequenceVerdict = SequenceVerdict.IDLE,
            sequenceOptions = _uiState.value.currentFidel.forms.shuffled()
        )
    }

    fun selectSequenceChip(letter: String) {
        speechService.speak(letter)
        _uiState.value = _uiState.value.copy(
            sequenceInputVal = letter,
            sequenceVerdict = SequenceVerdict.IDLE
        )
    }

    fun setSequenceInput(text: String) {
        _uiState.value = _uiState.value.copy(
            sequenceInputVal = text,
            sequenceVerdict = SequenceVerdict.IDLE
        )
    }

    fun checkSequence() {
        val state = _uiState.value
        val correctLetter = state.currentFidel.forms.getOrNull(state.missingIndex) ?: ""
        if (state.sequenceInputVal.trim() == correctLetter) {
            speechService.speak(correctLetter)
            speechService.vibrate(30)
            _uiState.value = state.copy(sequenceVerdict = SequenceVerdict.CORRECT)
        } else {
            speechService.vibrate(80)
            _uiState.value = state.copy(sequenceVerdict = SequenceVerdict.WRONG)
        }
    }

    // --- Match Quiz Actions ---
    fun refreshMatchQuiz() {
        val fidel = _uiState.value.currentFidel
        val matchCount = minOf(4, fidel.vocab.size)
        val chosenMatch = fidel.vocab.shuffled().take(matchCount)
        _uiState.value = _uiState.value.copy(
            matchWords = chosenMatch,
            shuffledMeanings = chosenMatch.shuffled(),
            selectedWordIndex = null,
            userMatches = emptyMap(),
            isMatchSubmitted = false
        )
    }

    fun selectMatchWord(index: Int) {
        val item = _uiState.value.matchWords.getOrNull(index)
        if (item != null) {
            speechService.speak(item.word)
        }
        _uiState.value = _uiState.value.copy(selectedWordIndex = index)
    }

    fun selectMatchMeaning(meaningIndex: Int) {
        val state = _uiState.value
        val selected = state.selectedWordIndex ?: return

        val newMatches = state.userMatches.toMutableMap()
        newMatches[selected] = meaningIndex

        // Auto advance to next unmatched word
        val nextUnmatched = state.matchWords.indices.firstOrNull { it != selected && !newMatches.containsKey(it) }

        _uiState.value = state.copy(
            userMatches = newMatches,
            selectedWordIndex = nextUnmatched
        )
    }

    fun clearMatch(wordIndex: Int) {
        val newMatches = _uiState.value.userMatches.toMutableMap()
        newMatches.remove(wordIndex)
        _uiState.value = _uiState.value.copy(userMatches = newMatches)
    }

    fun checkMatches() {
        speechService.vibrate(25)
        _uiState.value = _uiState.value.copy(isMatchSubmitted = true)
    }

    // --- Hunt Quiz Actions ---
    fun refreshHuntQuiz() {
        val fidel = _uiState.value.currentFidel
        val targetCount = minOf(5, fidel.vocab.size)
        val targetWords = fidel.vocab.shuffled().take(targetCount).map {
            HuntWordItem(it.form, it.word, it.translit, it.fr, it.en, isTarget = true)
        }
        val otherVocabPool = FIDEL_DATA
            .filter { it.base != fidel.base }
            .flatMap { it.vocab }
        val distractorWords = otherVocabPool.shuffled().take(5).map {
            HuntWordItem(it.form, it.word, it.translit, it.fr, it.en, isTarget = false)
        }
        _uiState.value = _uiState.value.copy(
            huntWords = (targetWords + distractorWords).shuffled(),
            circledIndices = emptySet()
        )
    }

    fun toggleHuntCircle(index: Int) {
        val state = _uiState.value
        val item = state.huntWords.getOrNull(index) ?: return
        speechService.speak(item.word)

        val nextSet = state.circledIndices.toMutableSet()
        if (nextSet.contains(index)) {
            nextSet.remove(index)
        } else {
            nextSet.add(index)
        }
        _uiState.value = state.copy(circledIndices = nextSet)
    }

    // --- Tracing Actions ---
    fun selectTracingForm(index: Int) {
        val form = _uiState.value.currentFidel.forms.getOrNull(index) ?: return
        speechService.speak(form)
        _uiState.value = _uiState.value.copy(
            activeTracingIndex = index,
            drawingPaths = emptyList(),
            currentStroke = emptyList()
        )
    }

    fun setPenColor(color: Color) {
        _uiState.value = _uiState.value.copy(penColor = color, isEraser = false)
    }

    fun setStrokeWidth(width: Float) {
        _uiState.value = _uiState.value.copy(strokeWidth = width)
    }

    fun toggleEraser() {
        _uiState.value = _uiState.value.copy(isEraser = !_uiState.value.isEraser)
    }

    fun startStroke(point: Offset) {
        _uiState.value = _uiState.value.copy(
            currentStroke = listOf(point)
        )
    }

    fun addPointToStroke(point: Offset) {
        val updated = _uiState.value.currentStroke + point
        _uiState.value = _uiState.value.copy(currentStroke = updated)
    }

    fun endStroke() {
        val state = _uiState.value
        if (state.currentStroke.isNotEmpty()) {
            val newPath = DrawingPath(
                points = state.currentStroke,
                color = state.penColor,
                strokeWidth = if (state.isEraser) state.strokeWidth * 2.5f else state.strokeWidth,
                isEraser = state.isEraser
            )
            _uiState.value = state.copy(
                drawingPaths = state.drawingPaths + newPath,
                currentStroke = emptyList()
            )
        }
    }

    fun undoDrawing() {
        val state = _uiState.value
        if (state.drawingPaths.isNotEmpty()) {
            _uiState.value = state.copy(
                drawingPaths = state.drawingPaths.dropLast(1)
            )
        }
    }

    fun clearDrawing() {
        _uiState.value = _uiState.value.copy(
            drawingPaths = emptyList(),
            currentStroke = emptyList()
        )
    }

    fun speak(text: String) {
        speechService.speak(text)
    }
}
