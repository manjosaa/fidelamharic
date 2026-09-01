package com.example.fidel.ui.components

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
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.VolumeUp
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.HorizontalDivider
import androidx.compose.material3.Icon
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.text.font.FontStyle
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.fidel.data.ORDER_NAMES
import com.example.fidel.model.FidelFamily
import com.example.fidel.model.Language
import com.example.fidel.ui.theme.EmeraldGreen
import com.example.fidel.ui.theme.GoldAccent
import com.example.fidel.ui.theme.GoldSoft
import com.example.fidel.ui.theme.InkDark
import com.example.fidel.ui.theme.InkSoft
import com.example.fidel.ui.theme.PaperBg
import com.example.fidel.ui.theme.PaperSheet
import com.example.fidel.ui.theme.SheetBorder
import com.example.fidel.ui.theme.WhitePure

@Composable
fun FidelChartSection(
    fidel: FidelFamily,
    lang: Language,
    onSpeak: (String) -> Unit,
    modifier: Modifier = Modifier
) {
    val isFr = lang == Language.FR

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
                    text = "1.",
                    fontSize = 20.sp,
                    fontWeight = FontWeight.Bold,
                    fontFamily = FontFamily.Serif,
                    color = GoldAccent
                )
                Text(
                    text = if (isFr) "Tableau du fidel" else "Fidel Chart & Orders",
                    fontSize = 17.sp,
                    fontWeight = FontWeight.Bold,
                    fontFamily = FontFamily.Serif,
                    color = InkDark
                )
            }
            Row(
                verticalAlignment = Alignment.CenterVertically,
                horizontalArrangement = Arrangement.spacedBy(4.dp)
            ) {
                Icon(
                    imageVector = Icons.Default.VolumeUp,
                    contentDescription = null,
                    tint = GoldAccent,
                    modifier = Modifier.size(15.dp)
                )
                Text(
                    text = if (isFr) "7 ordres vocaliques" else "7 vowel orders",
                    fontSize = 11.sp,
                    color = InkSoft
                )
            }
        }

        Text(
            text = if (isFr) {
                "Chaque consonne se décline en sept formes selon la voyelle associée. Touchez une lettre ou un mot pour écouter :"
            } else {
                "Each consonant root inflects into seven distinct forms depending on the vowel sound. Tap any letter or word to listen:"
            },
            fontSize = 12.sp,
            color = InkSoft,
            lineHeight = 16.sp
        )

        // 7 Forms Table Container Card
        Card(
            modifier = Modifier
                .fillMaxWidth()
                .testTag("fidel_chart_table"),
            shape = RoundedCornerShape(12.dp),
            colors = CardDefaults.cardColors(containerColor = WhitePure.copy(alpha = 0.85f)),
            border = androidx.compose.foundation.BorderStroke(1.dp, SheetBorder)
        ) {
            Column(modifier = Modifier.fillMaxWidth()) {
                // Table Header Row
                Row(
                    modifier = Modifier
                        .fillMaxWidth()
                        .background(PaperBg.copy(alpha = 0.6f))
                        .padding(horizontal = 10.dp, vertical = 8.dp),
                    horizontalArrangement = Arrangement.SpaceBetween,
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Text(text = "#", fontSize = 11.sp, fontWeight = FontWeight.Bold, color = InkSoft, modifier = Modifier.weight(0.6f))
                    Text(text = if (isFr) "Forme" else "Form", fontSize = 11.sp, fontWeight = FontWeight.Bold, color = InkSoft, modifier = Modifier.weight(1.2f))
                    Text(text = if (isFr) "Son" else "Sound", fontSize = 11.sp, fontWeight = FontWeight.Bold, color = InkSoft, modifier = Modifier.weight(1.2f))
                    Text(text = if (isFr) "Exemple" else "Example", fontSize = 11.sp, fontWeight = FontWeight.Bold, color = InkSoft, modifier = Modifier.weight(2.2f))
                    Text(text = if (isFr) "Signification" else "Meaning", fontSize = 11.sp, fontWeight = FontWeight.Bold, color = InkSoft, modifier = Modifier.weight(2.8f))
                }

                HorizontalDivider(color = SheetBorder.copy(alpha = 0.6f), thickness = 1.dp)

                // 7 Rows
                fidel.forms.forEachIndexed { index, form ->
                    val orderInfo = ORDER_NAMES.getOrNull(index)
                    val vocab = fidel.vocab.find { it.form == form }
                    val sound = if (vocab != null) {
                        vocab.translit.split(" ").firstOrNull()?.split(",")?.firstOrNull() ?: orderInfo?.vowel ?: ""
                    } else {
                        orderInfo?.vowel ?: ""
                    }
                    val meaning = if (vocab != null) {
                        if (isFr) vocab.fr else vocab.en
                    } else "—"

                    Row(
                        modifier = Modifier
                            .fillMaxWidth()
                            .clickable {
                                onSpeak(vocab?.word ?: form)
                            }
                            .padding(horizontal = 10.dp, vertical = 8.dp),
                        horizontalArrangement = Arrangement.SpaceBetween,
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        // Order Index
                        Text(
                            text = "${index + 1}",
                            fontSize = 12.sp,
                            fontWeight = FontWeight.Bold,
                            fontFamily = FontFamily.Serif,
                            color = GoldAccent,
                            modifier = Modifier.weight(0.6f)
                        )

                        // Glyph Button
                        Surface(
                            modifier = Modifier
                                .weight(1.2f)
                                .clip(RoundedCornerShape(6.dp))
                                .clickable { onSpeak(vocab?.word ?: form) }
                                .testTag("glyph_button_$form"),
                            color = GoldSoft.copy(alpha = 0.35f),
                            shape = RoundedCornerShape(6.dp)
                        ) {
                            Box(
                                modifier = Modifier.padding(vertical = 2.dp, horizontal = 4.dp),
                                contentAlignment = Alignment.Center
                            ) {
                                Text(
                                    text = form,
                                    fontSize = 20.sp,
                                    fontWeight = FontWeight.Bold,
                                    color = EmeraldGreen
                                )
                            }
                        }

                        // Phonetic sound
                        Text(
                            text = sound,
                            fontSize = 12.sp,
                            fontStyle = FontStyle.Italic,
                            color = InkSoft,
                            modifier = Modifier.weight(1.2f).padding(start = 4.dp)
                        )

                        // Example Word
                        Row(
                            modifier = Modifier
                                .weight(2.2f)
                                .clickable {
                                    if (vocab != null) onSpeak(vocab.word)
                                },
                            verticalAlignment = Alignment.CenterVertically,
                            horizontalArrangement = Arrangement.spacedBy(3.dp)
                        ) {
                            if (vocab != null) {
                                Text(
                                    text = vocab.word,
                                    fontSize = 14.sp,
                                    fontWeight = FontWeight.SemiBold,
                                    color = InkDark
                                )
                                Icon(
                                    imageVector = Icons.Default.VolumeUp,
                                    contentDescription = null,
                                    tint = GoldAccent,
                                    modifier = Modifier.size(13.dp)
                                )
                            } else {
                                Text(text = "—", fontSize = 12.sp, color = SheetBorder)
                            }
                        }

                        // Meaning
                        Text(
                            text = meaning,
                            fontSize = 12.sp,
                            color = InkSoft,
                            lineHeight = 15.sp,
                            modifier = Modifier.weight(2.8f)
                        )
                    }

                    if (index < fidel.forms.size - 1) {
                        HorizontalDivider(color = SheetBorder.copy(alpha = 0.3f), thickness = 0.8.dp)
                    }
                }
            }
        }
    }
}
