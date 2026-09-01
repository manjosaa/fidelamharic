package com.example.fidel.ui.components

import androidx.compose.animation.AnimatedVisibility
import androidx.compose.animation.fadeIn
import androidx.compose.animation.fadeOut
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.ExperimentalLayoutApi
import androidx.compose.foundation.layout.FlowRow
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.AutoAwesome
import androidx.compose.material.icons.filled.Check
import androidx.compose.material.icons.filled.HelpOutline
import androidx.compose.material.icons.filled.Refresh
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.Icon
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.OutlinedTextFieldDefaults
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.text.TextStyle
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.fidel.model.FidelFamily
import com.example.fidel.model.Language
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
import com.example.fidel.viewmodel.SequenceVerdict

@OptIn(ExperimentalLayoutApi::class)
@Composable
fun MissingSequenceSection(
    fidel: FidelFamily,
    missingIdx: Int,
    inputVal: String,
    verdict: SequenceVerdict,
    options: List<String>,
    lang: Language,
    onInputChange: (String) -> Unit,
    onOptionSelect: (String) -> Unit,
    onCheck: () -> Unit,
    onRefresh: () -> Unit,
    onSpeak: (String) -> Unit,
    modifier: Modifier = Modifier
) {
    val isFr = lang == Language.FR
    val correctLetter = fidel.forms.getOrNull(missingIdx) ?: ""

    Column(
        modifier = modifier
            .fillMaxWidth()
            .padding(bottom = 16.dp),
        verticalArrangement = Arrangement.spacedBy(8.dp)
    ) {
        // Header
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
                    text = "2.",
                    fontSize = 20.sp,
                    fontWeight = FontWeight.Bold,
                    fontFamily = FontFamily.Serif,
                    color = GoldAccent
                )
                Text(
                    text = if (isFr) "Séquence manquante" else "Missing Sequence Form",
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
                    .testTag("refresh_sequence_button"),
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
                        contentDescription = "Randomize",
                        tint = GoldAccent,
                        modifier = Modifier.size(13.dp)
                    )
                    Text(
                        text = if (isFr) "Aléatoire" else "Randomize",
                        fontSize = 11.sp,
                        color = InkSoft,
                        fontWeight = FontWeight.Medium
                    )
                }
            }
        }

        Text(
            text = if (isFr) {
                "Trouvez et inscrivez la forme manquante de la série dans la case dorée (touchez les suggestions ci-dessous ou tapez la lettre) :"
            } else {
                "Find the missing form in the sequence and fill in the blank (tap one of the quick suggestions below):"
            },
            fontSize = 12.sp,
            color = InkSoft,
            lineHeight = 16.sp
        )

        // 7 Forms Line Display
        Card(
            modifier = Modifier
                .fillMaxWidth()
                .testTag("sequence_row_card"),
            shape = RoundedCornerShape(12.dp),
            colors = CardDefaults.cardColors(containerColor = WhitePure.copy(alpha = 0.85f)),
            border = androidx.compose.foundation.BorderStroke(1.dp, SheetBorder)
        ) {
            Row(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(8.dp),
                horizontalArrangement = Arrangement.SpaceEvenly,
                verticalAlignment = Alignment.CenterVertically
            ) {
                fidel.forms.forEachIndexed { idx, form ->
                    if (idx == missingIdx) {
                        // Missing item cell
                        Column(
                            horizontalAlignment = Alignment.CenterHorizontally,
                            verticalArrangement = Arrangement.spacedBy(2.dp)
                        ) {
                            Surface(
                                shape = RoundedCornerShape(10.dp),
                                color = when (verdict) {
                                    SequenceVerdict.CORRECT -> EmeraldLight
                                    SequenceVerdict.WRONG -> CrimsonLight
                                    SequenceVerdict.IDLE -> GoldSoft.copy(alpha = 0.5f)
                                },
                                border = androidx.compose.foundation.BorderStroke(
                                    2.dp,
                                    when (verdict) {
                                        SequenceVerdict.CORRECT -> EmeraldGreen
                                        SequenceVerdict.WRONG -> CrimsonRed
                                        SequenceVerdict.IDLE -> GoldAccent
                                    }
                                ),
                                modifier = Modifier
                                    .size(42.dp)
                                    .testTag("missing_sequence_input_cell")
                            ) {
                                Box(contentAlignment = Alignment.Center) {
                                    Text(
                                        text = if (inputVal.isNotEmpty()) inputVal else "?",
                                        fontSize = 20.sp,
                                        fontWeight = FontWeight.Bold,
                                        color = when (verdict) {
                                            SequenceVerdict.CORRECT -> EmeraldGreen
                                            SequenceVerdict.WRONG -> CrimsonRed
                                            SequenceVerdict.IDLE -> InkDark
                                        }
                                    )
                                }
                            }
                            Text(
                                text = "${idx + 1}",
                                fontSize = 10.sp,
                                fontFamily = FontFamily.Serif,
                                color = GoldAccent,
                                fontWeight = FontWeight.Bold
                            )
                        }
                    } else {
                        // Normal form cell
                        Column(
                            horizontalAlignment = Alignment.CenterHorizontally,
                            verticalArrangement = Arrangement.spacedBy(2.dp)
                        ) {
                            Surface(
                                modifier = Modifier
                                    .size(42.dp)
                                    .clip(RoundedCornerShape(10.dp))
                                    .clickable { onSpeak(form) }
                                    .testTag("sequence_cell_$form"),
                                shape = RoundedCornerShape(10.dp),
                                color = WhitePure,
                                border = androidx.compose.foundation.BorderStroke(1.dp, SheetBorder)
                            ) {
                                Box(contentAlignment = Alignment.Center) {
                                    Text(
                                        text = form,
                                        fontSize = 19.sp,
                                        fontWeight = FontWeight.Bold,
                                        color = InkDark
                                    )
                                }
                            }
                            Text(
                                text = "${idx + 1}",
                                fontSize = 10.sp,
                                fontFamily = FontFamily.Serif,
                                color = InkSoft
                            )
                        }
                    }
                }
            }
        }

        // Quick Choice Suggestion Chips
        Surface(
            modifier = Modifier.fillMaxWidth(),
            shape = RoundedCornerShape(10.dp),
            color = PaperBg.copy(alpha = 0.5f),
            border = androidx.compose.foundation.BorderStroke(1.dp, SheetBorder.copy(alpha = 0.6f))
        ) {
            Column(
                modifier = Modifier.padding(8.dp),
                verticalArrangement = Arrangement.spacedBy(6.dp)
            ) {
                Row(
                    verticalAlignment = Alignment.CenterVertically,
                    horizontalArrangement = Arrangement.spacedBy(4.dp)
                ) {
                    Icon(
                        imageVector = Icons.Default.HelpOutline,
                        contentDescription = null,
                        tint = GoldAccent,
                        modifier = Modifier.size(13.dp)
                    )
                    Text(
                        text = if (isFr) "Choix rapide (sur téléphone) :" else "Quick Choice (on phone):",
                        fontSize = 11.sp,
                        fontWeight = FontWeight.SemiBold,
                        color = InkSoft
                    )
                }

                FlowRow(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.spacedBy(6.dp),
                    verticalArrangement = Arrangement.spacedBy(6.dp)
                ) {
                    options.forEach { letter ->
                        val isSelected = inputVal == letter
                        Surface(
                            modifier = Modifier
                                .clip(RoundedCornerShape(8.dp))
                                .clickable { onOptionSelect(letter) }
                                .testTag("sequence_chip_$letter"),
                            shape = RoundedCornerShape(8.dp),
                            color = if (isSelected) EmeraldGreen else WhitePure,
                            border = androidx.compose.foundation.BorderStroke(
                                1.dp,
                                if (isSelected) EmeraldGreen else SheetBorder
                            )
                        ) {
                            Box(
                                modifier = Modifier
                                    .padding(horizontal = 14.dp, vertical = 7.dp),
                                contentAlignment = Alignment.Center
                            ) {
                                Text(
                                    text = letter,
                                    fontSize = 18.sp,
                                    fontWeight = FontWeight.Bold,
                                    color = if (isSelected) WhitePure else InkDark
                                )
                            }
                        }
                    }
                }
            }
        }

        // Check Button & Verdict Message
        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.spacedBy(8.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            Button(
                onClick = onCheck,
                enabled = inputVal.isNotBlank(),
                colors = ButtonDefaults.buttonColors(
                    containerColor = InkDark,
                    contentColor = WhitePure,
                    disabledContainerColor = InkDark.copy(alpha = 0.35f)
                ),
                shape = RoundedCornerShape(8.dp),
                modifier = Modifier.testTag("check_sequence_button")
            ) {
                Row(
                    verticalAlignment = Alignment.CenterVertically,
                    horizontalArrangement = Arrangement.spacedBy(4.dp)
                ) {
                    Icon(imageVector = Icons.Default.Check, contentDescription = null, modifier = Modifier.size(16.dp))
                    Text(
                        text = if (isFr) "Vérifier la réponse" else "Check answer",
                        fontSize = 12.sp,
                        fontWeight = FontWeight.SemiBold
                    )
                }
            }

            AnimatedVisibility(
                visible = verdict == SequenceVerdict.CORRECT,
                enter = fadeIn(),
                exit = fadeOut()
            ) {
                Row(
                    verticalAlignment = Alignment.CenterVertically,
                    horizontalArrangement = Arrangement.spacedBy(4.dp)
                ) {
                    Icon(
                        imageVector = Icons.Default.AutoAwesome,
                        contentDescription = null,
                        tint = GoldAccent,
                        modifier = Modifier.size(16.dp)
                    )
                    Text(
                        text = if (isFr) "Bravo ! C'est bien \"$correctLetter\"." else "Correct! It is \"$correctLetter\".",
                        fontSize = 12.sp,
                        fontWeight = FontWeight.Bold,
                        color = EmeraldGreen
                    )
                }
            }

            AnimatedVisibility(
                visible = verdict == SequenceVerdict.WRONG,
                enter = fadeIn(),
                exit = fadeOut()
            ) {
                Text(
                    text = if (isFr) "Pas tout à fait — ordre ${missingIdx + 1}." else "Not quite — check order ${missingIdx + 1}.",
                    fontSize = 12.sp,
                    fontWeight = FontWeight.SemiBold,
                    color = CrimsonRed
                )
            }
        }
    }
}
