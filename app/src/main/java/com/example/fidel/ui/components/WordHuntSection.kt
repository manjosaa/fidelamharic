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
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.AutoAwesome
import androidx.compose.material.icons.filled.Check
import androidx.compose.material.icons.filled.Refresh
import androidx.compose.material.icons.filled.VolumeUp
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
import com.example.fidel.model.FidelFamily
import com.example.fidel.model.HuntWordItem
import com.example.fidel.model.Language
import com.example.fidel.ui.theme.EmeraldGreen
import com.example.fidel.ui.theme.EmeraldLight
import com.example.fidel.ui.theme.GoldAccent
import com.example.fidel.ui.theme.InkDark
import com.example.fidel.ui.theme.InkSoft
import com.example.fidel.ui.theme.PaperBg
import com.example.fidel.ui.theme.PaperSheet
import com.example.fidel.ui.theme.SheetBorder
import com.example.fidel.ui.theme.WhitePure

@OptIn(ExperimentalLayoutApi::class)
@Composable
fun WordHuntSection(
    fidel: FidelFamily,
    huntWords: List<HuntWordItem>,
    circledIndices: Set<Int>,
    showKey: Boolean,
    lang: Language,
    onToggleCircle: (Int) -> Unit,
    onRefresh: () -> Unit,
    modifier: Modifier = Modifier
) {
    val isFr = lang == Language.FR
    val targetCount = huntWords.count { it.isTarget }
    val correctlyCircled = huntWords.filterIndexed { idx, it -> circledIndices.contains(idx) && it.isTarget }.size
    val allFound = correctlyCircled == targetCount && targetCount > 0

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
                    text = "4.",
                    fontSize = 20.sp,
                    fontWeight = FontWeight.Bold,
                    fontFamily = FontFamily.Serif,
                    color = GoldAccent
                )
                Text(
                    text = if (isFr) "Chasse aux mots" else "Word & Letter Hunt",
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
                    .testTag("refresh_hunt_button"),
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
                        contentDescription = "New grid",
                        tint = GoldAccent,
                        modifier = Modifier.size(13.dp)
                    )
                    Text(
                        text = if (isFr) "Nouvelle grille" else "New grid",
                        fontSize = 11.sp,
                        color = InkSoft,
                        fontWeight = FontWeight.Medium
                    )
                }
            }
        }

        // Instructions with counter pill
        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.SpaceBetween,
            verticalAlignment = Alignment.CenterVertically
        ) {
            Text(
                text = if (isFr) {
                    "Entourez les mots qui contiennent la lettre « ${fidel.base} » :"
                } else {
                    "Circle all the words containing the letter '${fidel.base}':"
                },
                fontSize = 12.sp,
                color = InkSoft,
                modifier = Modifier.weight(1f)
            )

            Surface(
                shape = RoundedCornerShape(12.dp),
                color = if (allFound) EmeraldLight else PaperBg,
                border = androidx.compose.foundation.BorderStroke(
                    1.dp,
                    if (allFound) EmeraldGreen else SheetBorder
                )
            ) {
                Text(
                    text = "$correctlyCircled / $targetCount",
                    fontSize = 11.sp,
                    fontWeight = FontWeight.Bold,
                    color = if (allFound) EmeraldGreen else InkDark,
                    modifier = Modifier.padding(horizontal = 8.dp, vertical = 3.dp)
                )
            }
        }

        // Words Cloud Card
        Card(
            modifier = Modifier
                .fillMaxWidth()
                .testTag("hunt_grid_card"),
            shape = RoundedCornerShape(12.dp),
            colors = CardDefaults.cardColors(containerColor = WhitePure.copy(alpha = 0.85f)),
            border = androidx.compose.foundation.BorderStroke(1.dp, SheetBorder)
        ) {
            FlowRow(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(12.dp),
                horizontalArrangement = Arrangement.spacedBy(8.dp),
                verticalArrangement = Arrangement.spacedBy(8.dp)
            ) {
                huntWords.forEachIndexed { idx, item ->
                    val isCircled = circledIndices.contains(idx)
                    val isRevealedTarget = showKey && item.isTarget

                    Surface(
                        modifier = Modifier
                            .clip(RoundedCornerShape(12.dp))
                            .clickable { onToggleCircle(idx) }
                            .testTag("hunt_item_$idx"),
                        shape = RoundedCornerShape(12.dp),
                        color = when {
                            isCircled && item.isTarget -> EmeraldLight
                            isCircled && !item.isTarget -> PaperBg
                            isRevealedTarget -> EmeraldLight.copy(alpha = 0.5f)
                            else -> PaperSheet.copy(alpha = 0.7f)
                        },
                        border = androidx.compose.foundation.BorderStroke(
                            if (isCircled || isRevealedTarget) 2.dp else 1.dp,
                            when {
                                isCircled && item.isTarget -> EmeraldGreen
                                isCircled && !item.isTarget -> GoldAccent
                                isRevealedTarget -> EmeraldGreen.copy(alpha = 0.8f)
                                else -> SheetBorder
                            }
                        )
                    ) {
                        Row(
                            modifier = Modifier.padding(horizontal = 12.dp, vertical = 8.dp),
                            verticalAlignment = Alignment.CenterVertically,
                            horizontalArrangement = Arrangement.spacedBy(6.dp)
                        ) {
                            Text(
                                text = item.word,
                                fontSize = 17.sp,
                                fontWeight = FontWeight.Bold,
                                color = if (isCircled && item.isTarget) EmeraldGreen else InkDark
                            )
                            Icon(
                                imageVector = Icons.Default.VolumeUp,
                                contentDescription = null,
                                tint = GoldAccent,
                                modifier = Modifier.size(13.dp)
                            )
                        }
                    }
                }
            }
        }

        // Completion indicator
        AnimatedVisibility(visible = allFound, enter = fadeIn(), exit = fadeOut()) {
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
                    text = if (isFr) "Félicitations ! Vous avez trouvé tous les mots." else "Congratulations! You found all matching words.",
                    fontSize = 12.sp,
                    fontWeight = FontWeight.Bold,
                    color = EmeraldGreen
                )
            }
        }
    }
}
