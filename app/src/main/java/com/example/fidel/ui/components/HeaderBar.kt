package com.example.fidel.ui.components

import androidx.compose.animation.AnimatedVisibility
import androidx.compose.animation.fadeIn
import androidx.compose.animation.fadeOut
import androidx.compose.foundation.background
import androidx.compose.foundation.border
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
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.lazy.grid.GridCells
import androidx.compose.foundation.lazy.grid.LazyVerticalGrid
import androidx.compose.foundation.lazy.grid.items
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.AutoAwesome
import androidx.compose.material.icons.filled.Check
import androidx.compose.material.icons.filled.GridOn
import androidx.compose.material.icons.filled.HelpOutline
import androidx.compose.material.icons.filled.Language
import androidx.compose.material.icons.filled.Visibility
import androidx.compose.material.icons.filled.VisibilityOff
import androidx.compose.material.icons.filled.VolumeUp
import androidx.compose.material.icons.filled.Wifi
import androidx.compose.material.icons.filled.WifiOff
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.compose.ui.window.Dialog
import com.example.fidel.data.FIDEL_DATA
import com.example.fidel.model.AudioState
import com.example.fidel.model.FidelFamily
import com.example.fidel.model.Language
import com.example.fidel.ui.theme.CrimsonRed
import com.example.fidel.ui.theme.EmeraldGreen
import com.example.fidel.ui.theme.GoldAccent
import com.example.fidel.ui.theme.GoldSoft
import com.example.fidel.ui.theme.InkDark
import com.example.fidel.ui.theme.InkSoft
import com.example.fidel.ui.theme.PaperBg
import com.example.fidel.ui.theme.PaperSheet
import com.example.fidel.ui.theme.SheetBorder
import com.example.fidel.ui.theme.WhitePure

@OptIn(ExperimentalLayoutApi::class)
@Composable
fun HeaderBar(
    currentFidel: FidelFamily,
    onSelectFidel: (FidelFamily) -> Unit,
    lang: Language,
    onToggleLang: () -> Unit,
    showKey: Boolean,
    onToggleKey: () -> Unit,
    onNewSheet: () -> Unit,
    onOpenVoiceHelp: () -> Unit,
    audioState: AudioState,
    modifier: Modifier = Modifier
) {
    val isFr = lang == Language.FR
    var showGridDialog by remember { mutableStateOf(false) }

    Column(
        modifier = modifier
            .fillMaxWidth()
            .padding(bottom = 8.dp),
        verticalArrangement = Arrangement.spacedBy(8.dp)
    ) {
        // Main Control Bar Card
        Card(
            modifier = Modifier
                .fillMaxWidth()
                .testTag("header_control_card"),
            shape = RoundedCornerShape(16.dp),
            colors = CardDefaults.cardColors(containerColor = PaperSheet),
            border = androidx.compose.foundation.BorderStroke(1.dp, SheetBorder),
            elevation = CardDefaults.cardElevation(defaultElevation = 2.dp)
        ) {
            Column(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(10.dp),
                verticalArrangement = Arrangement.spacedBy(10.dp)
            ) {
                // Top row with letter selector & language toggle
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.SpaceBetween,
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    // Letter Picker Button
                    Surface(
                        modifier = Modifier
                            .clip(RoundedCornerShape(10.dp))
                            .clickable { showGridDialog = true }
                            .testTag("letter_picker_button"),
                        color = WhitePure,
                        shape = RoundedCornerShape(10.dp),
                        border = androidx.compose.foundation.BorderStroke(1.dp, SheetBorder)
                    ) {
                        Row(
                            modifier = Modifier.padding(horizontal = 10.dp, vertical = 6.dp),
                            verticalAlignment = Alignment.CenterVertically,
                            horizontalArrangement = Arrangement.spacedBy(6.dp)
                        ) {
                            Icon(
                                imageVector = Icons.Default.GridOn,
                                contentDescription = "33 Fidel Letters",
                                tint = GoldAccent,
                                modifier = Modifier.size(18.dp)
                            )
                            Text(
                                text = currentFidel.base,
                                fontSize = 20.sp,
                                fontWeight = FontWeight.Bold,
                                color = EmeraldGreen
                            )
                            Text(
                                text = currentFidel.name,
                                fontSize = 12.sp,
                                fontWeight = FontWeight.Medium,
                                color = InkSoft
                            )
                        }
                    }

                    // Language Toggle (FR / EN)
                    Surface(
                        modifier = Modifier
                            .clip(RoundedCornerShape(10.dp))
                            .clickable { onToggleLang() }
                            .testTag("language_toggle_button"),
                        color = WhitePure,
                        shape = RoundedCornerShape(10.dp),
                        border = androidx.compose.foundation.BorderStroke(1.dp, SheetBorder)
                    ) {
                        Row(
                            modifier = Modifier.padding(horizontal = 10.dp, vertical = 6.dp),
                            verticalAlignment = Alignment.CenterVertically,
                            horizontalArrangement = Arrangement.spacedBy(4.dp)
                        ) {
                            Icon(
                                imageVector = Icons.Default.Language,
                                contentDescription = "Language",
                                tint = GoldAccent,
                                modifier = Modifier.size(16.dp)
                            )
                            Text(
                                text = "FR",
                                fontSize = 12.sp,
                                fontWeight = if (isFr) FontWeight.Bold else FontWeight.Normal,
                                color = if (isFr) InkDark else InkSoft
                            )
                            Text(text = "/", fontSize = 12.sp, color = SheetBorder)
                            Text(
                                text = "EN",
                                fontSize = 12.sp,
                                fontWeight = if (!isFr) FontWeight.Bold else FontWeight.Normal,
                                color = if (!isFr) InkDark else InkSoft
                            )
                        }
                    }
                }

                // Action Buttons Row
                FlowRow(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.spacedBy(6.dp),
                    verticalArrangement = Arrangement.spacedBy(6.dp)
                ) {
                    // Voice Help Button
                    Surface(
                        modifier = Modifier
                            .clip(RoundedCornerShape(8.dp))
                            .clickable { onOpenVoiceHelp() }
                            .testTag("voice_help_button"),
                        color = WhitePure,
                        shape = RoundedCornerShape(8.dp),
                        border = androidx.compose.foundation.BorderStroke(1.dp, SheetBorder)
                    ) {
                        Row(
                            modifier = Modifier.padding(horizontal = 10.dp, vertical = 7.dp),
                            verticalAlignment = Alignment.CenterVertically,
                            horizontalArrangement = Arrangement.spacedBy(4.dp)
                        ) {
                            Icon(
                                imageVector = Icons.Default.VolumeUp,
                                contentDescription = "Voice Help",
                                tint = GoldAccent,
                                modifier = Modifier.size(16.dp)
                            )
                            Text(
                                text = if (audioState.hasNativeVoice) {
                                    if (isFr) "Voix native" else "Native voice"
                                } else if (audioState.isOnline) {
                                    if (isFr) "Voix en ligne" else "Online voice"
                                } else {
                                    if (isFr) "Audio hors-ligne" else "Offline audio"
                                },
                                fontSize = 11.sp,
                                color = InkDark,
                                fontWeight = FontWeight.Medium
                            )
                            Icon(
                                imageVector = Icons.Default.HelpOutline,
                                contentDescription = null,
                                tint = InkSoft,
                                modifier = Modifier.size(14.dp)
                            )
                        }
                    }

                    // Answers / Key Toggle
                    Surface(
                        modifier = Modifier
                            .clip(RoundedCornerShape(8.dp))
                            .clickable { onToggleKey() }
                            .testTag("answer_key_button"),
                        color = if (showKey) EmeraldGreen else WhitePure,
                        shape = RoundedCornerShape(8.dp),
                        border = androidx.compose.foundation.BorderStroke(
                            1.dp,
                            if (showKey) EmeraldGreen else InkDark
                        )
                    ) {
                        Row(
                            modifier = Modifier.padding(horizontal = 10.dp, vertical = 7.dp),
                            verticalAlignment = Alignment.CenterVertically,
                            horizontalArrangement = Arrangement.spacedBy(4.dp)
                        ) {
                            Icon(
                                imageVector = if (showKey) Icons.Default.VisibilityOff else Icons.Default.Visibility,
                                contentDescription = null,
                                tint = if (showKey) WhitePure else InkDark,
                                modifier = Modifier.size(16.dp)
                            )
                            Text(
                                text = if (showKey) {
                                    if (isFr) "Masquer corrigé" else "Hide answers"
                                } else {
                                    if (isFr) "Corrigé" else "Answers"
                                },
                                fontSize = 11.sp,
                                color = if (showKey) WhitePure else InkDark,
                                fontWeight = FontWeight.Bold
                            )
                        }
                    }

                    // New Sheet / Randomize Button
                    Surface(
                        modifier = Modifier
                            .clip(RoundedCornerShape(8.dp))
                            .clickable { onNewSheet() }
                            .testTag("new_sheet_button"),
                        color = GoldAccent,
                        shape = RoundedCornerShape(8.dp)
                    ) {
                        Row(
                            modifier = Modifier.padding(horizontal = 10.dp, vertical = 7.dp),
                            verticalAlignment = Alignment.CenterVertically,
                            horizontalArrangement = Arrangement.spacedBy(4.dp)
                        ) {
                            Icon(
                                imageVector = Icons.Default.AutoAwesome,
                                contentDescription = null,
                                tint = WhitePure,
                                modifier = Modifier.size(16.dp)
                            )
                            Text(
                                text = if (isFr) "Nouvelle fiche" else "New sheet",
                                fontSize = 11.sp,
                                color = WhitePure,
                                fontWeight = FontWeight.Bold
                            )
                        }
                    }
                }
            }
        }

        // Live Audio Hint & Active Speaking Status Bar
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(horizontal = 4.dp),
            horizontalArrangement = Arrangement.SpaceBetween,
            verticalAlignment = Alignment.CenterVertically
        ) {
            Row(
                verticalAlignment = Alignment.CenterVertically,
                horizontalArrangement = Arrangement.spacedBy(4.dp),
                modifier = Modifier.weight(1f)
            ) {
                Text(text = "🔊", fontSize = 12.sp)
                Text(
                    text = if (isFr) {
                        "Touchez n’importe quelle lettre ou mot pour écouter."
                    } else {
                        "Tap any glyph or word to hear pronunciation."
                    },
                    fontSize = 11.sp,
                    color = InkSoft
                )
            }

            AnimatedVisibility(
                visible = audioState.isSpeaking && audioState.activeWord != null,
                enter = fadeIn(),
                exit = fadeOut()
            ) {
                Surface(
                    shape = RoundedCornerShape(12.dp),
                    color = EmeraldGreen.copy(alpha = 0.15f),
                    border = androidx.compose.foundation.BorderStroke(1.dp, EmeraldGreen.copy(alpha = 0.3f))
                ) {
                    Row(
                        modifier = Modifier.padding(horizontal = 8.dp, vertical = 2.dp),
                        verticalAlignment = Alignment.CenterVertically,
                        horizontalArrangement = Arrangement.spacedBy(4.dp)
                    ) {
                        Box(
                            modifier = Modifier
                                .size(6.dp)
                                .background(EmeraldGreen, CircleShape)
                        )
                        Text(
                            text = audioState.activeWord ?: "",
                            fontSize = 11.sp,
                            fontWeight = FontWeight.Bold,
                            color = EmeraldGreen
                        )
                    }
                }
            }
        }
    }

    // Grid Modal for selecting any of the 33 letters
    if (showGridDialog) {
        Dialog(onDismissRequest = { showGridDialog = false }) {
            Surface(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(8.dp),
                shape = RoundedCornerShape(18.dp),
                color = PaperSheet,
                border = androidx.compose.foundation.BorderStroke(1.dp, SheetBorder),
                shadowElevation = 8.dp
            ) {
                Column(
                    modifier = Modifier.padding(16.dp),
                    verticalArrangement = Arrangement.spacedBy(12.dp)
                ) {
                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.SpaceBetween,
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Column {
                            Text(
                                text = if (isFr) "33 Familles de Fidel" else "33 Fidel Families",
                                fontSize = 16.sp,
                                fontWeight = FontWeight.Bold,
                                fontFamily = FontFamily.Serif,
                                color = InkDark
                            )
                            Text(
                                text = if (isFr) "Touchez pour sélectionner" else "Tap a letter to open",
                                fontSize = 11.sp,
                                color = GoldAccent
                            )
                        }
                        IconButton(
                            onClick = { showGridDialog = false },
                            modifier = Modifier.testTag("close_grid_dialog_button")
                        ) {
                            Text(text = "✕", fontSize = 16.sp, color = InkSoft, fontWeight = FontWeight.Bold)
                        }
                    }

                    LazyVerticalGrid(
                        columns = GridCells.Fixed(6),
                        horizontalArrangement = Arrangement.spacedBy(6.dp),
                        verticalArrangement = Arrangement.spacedBy(6.dp),
                        modifier = Modifier.height(300.dp)
                    ) {
                        items(FIDEL_DATA) { item ->
                            val isSelected = item.base == currentFidel.base
                            Surface(
                                modifier = Modifier
                                    .clip(RoundedCornerShape(8.dp))
                                    .clickable {
                                        onSelectFidel(item)
                                        showGridDialog = false
                                    }
                                    .testTag("letter_grid_item_${item.base}"),
                                shape = RoundedCornerShape(8.dp),
                                color = if (isSelected) EmeraldGreen else WhitePure,
                                border = androidx.compose.foundation.BorderStroke(
                                    1.dp,
                                    if (isSelected) EmeraldGreen else SheetBorder
                                )
                            ) {
                                Box(
                                    modifier = Modifier
                                        .size(42.dp),
                                    contentAlignment = Alignment.Center
                                ) {
                                    Text(
                                        text = item.base,
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
        }
    }
}
