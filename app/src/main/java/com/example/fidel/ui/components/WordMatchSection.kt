package com.example.fidel.ui.components

import androidx.compose.animation.AnimatedVisibility
import androidx.compose.animation.fadeIn
import androidx.compose.animation.fadeOut
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.ArrowForward
import androidx.compose.material.icons.filled.AutoAwesome
import androidx.compose.material.icons.filled.Check
import androidx.compose.material.icons.filled.Refresh
import androidx.compose.material.icons.filled.VolumeUp
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.Icon
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.fidel.model.Language
import com.example.fidel.model.VocabItem
import com.example.fidel.ui.theme.CrimsonLight
import com.example.fidel.ui.theme.CrimsonRed
import com.example.fidel.ui.theme.EmeraldGreen
import com.example.fidel.ui.theme.EmeraldLight
import com.example.fidel.ui.theme.GoldAccent
import com.example.fidel.ui.theme.GoldSoft
import com.example.fidel.ui.theme.InkDark
import com.example.fidel.ui.theme.InkSoft
import com.example.fidel.ui.theme.PaperBg
import com.example.fidel.ui.theme.SheetBorder
import com.example.fidel.ui.theme.WhitePure

@Composable
fun WordMatchSection(
    words: List<VocabItem>,
    shuffledMeanings: List<VocabItem>,
    selectedWordIdx: Int?,
    userMatches: Map<Int, Int>,
    isSubmitted: Boolean,
    showKey: Boolean,
    lang: Language,
    onWordClick: (Int) -> Unit,
    onMeaningClick: (Int) -> Unit,
    onClearMatch: (Int) -> Unit,
    onCheck: () -> Unit,
    onRefresh: () -> Unit,
    onSpeak: (String) -> Unit,
    modifier: Modifier = Modifier
) {
    val isFr = lang == Language.FR
    val letters = listOf("A", "B", "C", "D", "E")

    Column(
        modifier = modifier
            .fillMaxWidth()
            .padding(bottom = 16.dp),
        verticalArrangement = Arrangement.spacedBy(8.dp)
    ) {
        // Section Header
        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.SpaceBetween,
            verticalAlignment = Alignment.CenterVertically
        ) {
            Row(
                verticalAlignment = Alignment.CenterVertically,
                horizontalArrangement = Arrangement.spacedBy(6.dp)
            ) {
                Text(
                    text = "3.",
                    fontSize = 20.sp,
                    fontWeight = FontWeight.Bold,
                    fontFamily = FontFamily.Serif,
                    color = GoldAccent
                )
                Text(
                    text = if (isFr) "Association de mots" else "Word & Meaning Matching",
                    fontSize = 17.sp,
                    fontWeight = FontWeight.Bold,
                    fontFamily = FontFamily.Serif,
                    color = InkDark
                )
            }

            Surface(
                modifier = Modifier
                    .clip(RoundedCornerShape(6.dp))
                    .clickable { onRefresh() }
                    .testTag("refresh_match_button"),
                color = WhitePure.copy(alpha = 0.8f),
                shape = RoundedCornerShape(6.dp),
                border = androidx.compose.foundation.BorderStroke(1.dp, SheetBorder)
            ) {
                Row(
                    modifier = Modifier.padding(horizontal = 8.dp, vertical = 4.dp),
                    verticalAlignment = Alignment.CenterVertically,
                    horizontalArrangement = Arrangement.spacedBy(4.dp)
                ) {
                    Icon(
                        imageVector = Icons.Default.Refresh,
                        contentDescription = "Shuffle",
                        tint = GoldAccent,
                        modifier = Modifier.size(13.dp)
                    )
                    Text(
                        text = if (isFr) "Mélanger" else "Shuffle",
                        fontSize = 11.sp,
                        color = InkSoft,
                        fontWeight = FontWeight.Medium
                    )
                }
            }
        }

        if (words.size < 2) {
            Card(
                modifier = Modifier.fillMaxWidth(),
                shape = RoundedCornerShape(10.dp),
                colors = CardDefaults.cardColors(containerColor = WhitePure.copy(alpha = 0.7f)),
                border = androidx.compose.foundation.BorderStroke(1.dp, SheetBorder)
            ) {
                Text(
                    text = if (isFr) {
                        "Cette lettre a peu de mots isolés dans l’amharique courant — entraînez-vous avec le tableau et le traçage."
                    } else {
                        "This root has few standalone words in common modern Amharic — focus on the chart and tracing exercises."
                    },
                    fontSize = 12.sp,
                    color = InkSoft,
                    modifier = Modifier.padding(12.dp)
                )
            }
            return@Column
        }

        Text(
            text = if (isFr) {
                "Touchez un mot amharique à gauche, puis touchez sa signification à droite pour les associer :"
            } else {
                "Tap an Amharic word on the left, then tap its definition on the right to pair them:"
            },
            fontSize = 12.sp,
            color = InkSoft,
            lineHeight = 16.sp
        )

        // Columns layout: Words (Left) & Meanings (Right)
        Column(
            modifier = Modifier.fillMaxWidth(),
            verticalArrangement = Arrangement.spacedBy(8.dp)
        ) {
            // Words List (Left / Top)
            Column(
                modifier = Modifier.fillMaxWidth(),
                verticalArrangement = Arrangement.spacedBy(6.dp)
            ) {
                Text(
                    text = if (isFr) "1. MOTS AMHARIQUES" else "1. AMHARIC WORDS",
                    fontSize = 10.sp,
                    fontWeight = FontWeight.Bold,
                    color = InkSoft,
                    letterSpacing = 1.sp
                )

                words.forEachIndexed { i, w ->
                    val isSelected = selectedWordIdx == i
                    val pairedIdx = userMatches[i]
                    val pairedLetter = if (pairedIdx != null) letters.getOrNull(pairedIdx) else null
                    val isCorrect = isSubmitted && pairedIdx != null && shuffledMeanings.getOrNull(pairedIdx)?.word == w.word
                    val isWrong = isSubmitted && pairedIdx != null && shuffledMeanings.getOrNull(pairedIdx)?.word != w.word

                    Surface(
                        modifier = Modifier
                            .fillMaxWidth()
                            .clip(RoundedCornerShape(10.dp))
                            .clickable { onWordClick(i) }
                            .testTag("match_word_item_$i"),
                        shape = RoundedCornerShape(10.dp),
                        color = when {
                            isSelected -> GoldSoft.copy(alpha = 0.5f)
                            isCorrect -> EmeraldLight
                            isWrong -> CrimsonLight
                            pairedLetter != null -> WhitePure
                            else -> WhitePure.copy(alpha = 0.8f)
                        },
                        border = androidx.compose.foundation.BorderStroke(
                            if (isSelected || isCorrect || isWrong) 1.5.dp else 1.dp,
                            when {
                                isSelected -> GoldAccent
                                isCorrect -> EmeraldGreen
                                isWrong -> CrimsonRed
                                else -> SheetBorder
                            }
                        )
                    ) {
                        Row(
                            modifier = Modifier
                                .fillMaxWidth()
                                .padding(horizontal = 10.dp, vertical = 8.dp),
                            horizontalArrangement = Arrangement.SpaceBetween,
                            verticalAlignment = Alignment.CenterVertically
                        ) {
                            Row(
                                verticalAlignment = Alignment.CenterVertically,
                                horizontalArrangement = Arrangement.spacedBy(6.dp)
                            ) {
                                Text(
                                    text = "${i + 1}.",
                                    fontSize = 13.sp,
                                    fontWeight = FontWeight.Bold,
                                    fontFamily = FontFamily.Serif,
                                    color = GoldAccent
                                )
                                Text(
                                    text = w.word,
                                    fontSize = 18.sp,
                                    fontWeight = FontWeight.Bold,
                                    color = InkDark
                                )
                                Surface(
                                    modifier = Modifier
                                        .clip(CircleShape)
                                        .clickable { onSpeak(w.word) },
                                    color = Color.Transparent
                                ) {
                                    Icon(
                                        imageVector = Icons.Default.VolumeUp,
                                        contentDescription = "Audio",
                                        tint = GoldAccent,
                                        modifier = Modifier.size(16.dp)
                                    )
                                }
                            }

                            if (pairedLetter != null) {
                                Row(
                                    verticalAlignment = Alignment.CenterVertically,
                                    horizontalArrangement = Arrangement.spacedBy(4.dp)
                                ) {
                                    Surface(
                                        shape = CircleShape,
                                        color = if (isCorrect) EmeraldGreen else if (isWrong) CrimsonRed else InkDark,
                                        modifier = Modifier.size(24.dp)
                                    ) {
                                        Box(contentAlignment = Alignment.Center) {
                                            Text(
                                                text = pairedLetter,
                                                fontSize = 12.sp,
                                                fontWeight = FontWeight.Bold,
                                                color = WhitePure
                                            )
                                        }
                                    }
                                    Text(
                                        text = "✕",
                                        fontSize = 14.sp,
                                        fontWeight = FontWeight.Bold,
                                        color = InkSoft,
                                        modifier = Modifier
                                            .clickable { onClearMatch(i) }
                                            .padding(2.dp)
                                    )
                                }
                            } else {
                                if (isSelected) {
                                    Text(
                                        text = if (isFr) "Choisir →" else "Pick →",
                                        fontSize = 11.sp,
                                        fontWeight = FontWeight.Bold,
                                        color = GoldAccent
                                    )
                                } else {
                                    Icon(
                                        imageVector = Icons.AutoMirrored.Filled.ArrowForward,
                                        contentDescription = null,
                                        tint = InkSoft.copy(alpha = 0.5f),
                                        modifier = Modifier.size(14.dp)
                                    )
                                }
                            }
                        }
                    }
                }
            }

            // Meanings List (Right / Bottom)
            Column(
                modifier = Modifier.fillMaxWidth(),
                verticalArrangement = Arrangement.spacedBy(6.dp)
            ) {
                Text(
                    text = if (isFr) "2. SIGNIFICATIONS" else "2. DEFINITIONS & MEANINGS",
                    fontSize = 10.sp,
                    fontWeight = FontWeight.Bold,
                    color = InkSoft,
                    letterSpacing = 1.sp
                )

                shuffledMeanings.forEachIndexed { i, m ->
                    val letter = letters.getOrNull(i) ?: "?"
                    val pairedLeftIdx = userMatches.entries.find { it.value == i }?.key

                    Surface(
                        modifier = Modifier
                            .fillMaxWidth()
                            .clip(RoundedCornerShape(10.dp))
                            .clickable { onMeaningClick(i) }
                            .testTag("match_meaning_item_$i"),
                        shape = RoundedCornerShape(10.dp),
                        color = if (pairedLeftIdx != null) EmeraldLight.copy(alpha = 0.6f) else WhitePure.copy(alpha = 0.8f),
                        border = androidx.compose.foundation.BorderStroke(
                            1.dp,
                            if (pairedLeftIdx != null) EmeraldGreen.copy(alpha = 0.7f) else SheetBorder
                        )
                    ) {
                        Row(
                            modifier = Modifier
                                .fillMaxWidth()
                                .padding(horizontal = 10.dp, vertical = 8.dp),
                            horizontalArrangement = Arrangement.SpaceBetween,
                            verticalAlignment = Alignment.CenterVertically
                        ) {
                            Row(
                                verticalAlignment = Alignment.CenterVertically,
                                horizontalArrangement = Arrangement.spacedBy(8.dp),
                                modifier = Modifier.weight(1f)
                            ) {
                                Surface(
                                    shape = CircleShape,
                                    color = WhitePure,
                                    border = androidx.compose.foundation.BorderStroke(1.dp, InkDark),
                                    modifier = Modifier.size(24.dp)
                                ) {
                                    Box(contentAlignment = Alignment.Center) {
                                        Text(
                                            text = letter,
                                            fontSize = 12.sp,
                                            fontWeight = FontWeight.Bold,
                                            color = InkDark
                                        )
                                    }
                                }
                                Text(
                                    text = if (isFr) m.fr else m.en,
                                    fontSize = 13.sp,
                                    color = InkDark,
                                    fontWeight = FontWeight.Medium
                                )
                            }

                            if (pairedLeftIdx != null) {
                                Text(
                                    text = "(#${pairedLeftIdx + 1})",
                                    fontSize = 11.sp,
                                    fontWeight = FontWeight.Bold,
                                    color = EmeraldGreen
                                )
                            }
                        }
                    }
                }
            }
        }

        // Check Pairs Button
        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.spacedBy(8.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            Button(
                onClick = onCheck,
                enabled = userMatches.isNotEmpty(),
                colors = ButtonDefaults.buttonColors(
                    containerColor = InkDark,
                    contentColor = WhitePure,
                    disabledContainerColor = InkDark.copy(alpha = 0.35f)
                ),
                shape = RoundedCornerShape(8.dp),
                modifier = Modifier.testTag("check_matches_button")
            ) {
                Row(
                    verticalAlignment = Alignment.CenterVertically,
                    horizontalArrangement = Arrangement.spacedBy(4.dp)
                ) {
                    Icon(imageVector = Icons.Default.Check, contentDescription = null, modifier = Modifier.size(16.dp))
                    Text(
                        text = if (isFr) "Vérifier les associations" else "Check pairs",
                        fontSize = 12.sp,
                        fontWeight = FontWeight.SemiBold
                    )
                }
            }

            AnimatedVisibility(visible = isSubmitted, enter = fadeIn(), exit = fadeOut()) {
                Text(
                    text = if (isFr) "Associations vérifiées." else "Pairings verified.",
                    fontSize = 12.sp,
                    color = EmeraldGreen,
                    fontWeight = FontWeight.Bold
                )
            }
        }

        // Answer Key
        if (showKey) {
            Surface(
                modifier = Modifier.fillMaxWidth(),
                shape = RoundedCornerShape(8.dp),
                color = WhitePure,
                border = androidx.compose.foundation.BorderStroke(1.dp, SheetBorder)
            ) {
                val keyMappings = words.mapIndexed { idx, w ->
                    val rightIdx = shuffledMeanings.indexOfFirst { it.word == w.word }
                    "${idx + 1} → ${letters.getOrNull(rightIdx) ?: "?"}"
                }

                Text(
                    text = "${if (isFr) "Corrigé :" else "Answer Key:"} ${keyMappings.joinToString(" · ")}",
                    fontSize = 12.sp,
                    fontWeight = FontWeight.SemiBold,
                    color = EmeraldGreen,
                    modifier = Modifier.padding(10.dp)
                )
            }
        }
    }
}
