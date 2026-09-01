package com.example.fidel.model

enum class Language(val code: String, val label: String) {
    FR("fr", "Français"),
    EN("en", "English")
}

data class VocabItem(
    val form: String,
    val word: String,
    val translit: String,
    val fr: String,
    val en: String
)

data class FidelFamily(
    val base: String,
    val name: String,
    val forms: List<String>, // 7 forms: 1st..7th
    val vocab: List<VocabItem>
)

data class OrderInfo(
    val order: Int,
    val nameAmh: String,
    val nameEn: String,
    val nameFr: String,
    val vowel: String
)

data class AudioState(
    val isSpeaking: Boolean = false,
    val isPlayingOnline: Boolean = false,
    val hasNativeVoice: Boolean = false,
    val isOnline: Boolean = true,
    val forceOnline: Boolean = false,
    val activeWord: String? = null
)

data class HuntWordItem(
    val form: String,
    val word: String,
    val translit: String,
    val fr: String,
    val en: String,
    val isTarget: Boolean
)

data class DrawingPath(
    val points: List<androidx.compose.ui.geometry.Offset>,
    val color: androidx.compose.ui.graphics.Color,
    val strokeWidth: Float,
    val isEraser: Boolean = false
)
