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
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.CheckCircle
import androidx.compose.material.icons.filled.Info
import androidx.compose.material.icons.filled.VolumeUp
import androidx.compose.material.icons.filled.Wifi
import androidx.compose.material.icons.filled.WifiOff
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
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
import androidx.compose.ui.window.Dialog
import com.example.fidel.model.AudioState
import com.example.fidel.model.Language
import com.example.fidel.ui.theme.CrimsonRed
import com.example.fidel.ui.theme.EmeraldGreen
import com.example.fidel.ui.theme.EmeraldLight
import com.example.fidel.ui.theme.GoldAccent
import com.example.fidel.ui.theme.GoldLight
import com.example.fidel.ui.theme.InkDark
import com.example.fidel.ui.theme.InkSoft
import com.example.fidel.ui.theme.PaperBg
import com.example.fidel.ui.theme.PaperSheet
import com.example.fidel.ui.theme.SheetBorder
import com.example.fidel.ui.theme.WhitePure

@Composable
fun VoiceHelpDialog(
    audioState: AudioState,
    lang: Language,
    onDismiss: () -> Unit,
    onTestVoice: () -> Unit,
    onToggleForceOnline: () -> Unit,
    modifier: Modifier = Modifier
) {
    val isFr = lang == Language.FR

    Dialog(onDismissRequest = onDismiss) {
        Surface(
            modifier = modifier
                .fillMaxWidth()
                .padding(8.dp)
                .testTag("voice_help_dialog"),
            shape = RoundedCornerShape(18.dp),
            color = PaperSheet,
            border = androidx.compose.foundation.BorderStroke(1.dp, SheetBorder),
            shadowElevation = 10.dp
        ) {
            Column(
                modifier = Modifier.padding(18.dp),
                verticalArrangement = Arrangement.spacedBy(14.dp)
            ) {
                // Header
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.SpaceBetween,
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Row(
                        verticalAlignment = Alignment.CenterVertically,
                        horizontalArrangement = Arrangement.spacedBy(8.dp)
                    ) {
                        Surface(
                            shape = CircleShape,
                            color = GoldLight,
                            border = androidx.compose.foundation.BorderStroke(1.dp, GoldAccent),
                            modifier = Modifier.size(34.dp)
                        ) {
                            Box(contentAlignment = Alignment.Center) {
                                Icon(
                                    imageVector = Icons.Default.VolumeUp,
                                    contentDescription = null,
                                    tint = GoldAccent,
                                    modifier = Modifier.size(18.dp)
                                )
                            }
                        }

                        Column {
                            Text(
                                text = if (isFr) "Prononciation Amharique" else "Amharic Pronunciation Guide",
                                fontSize = 16.sp,
                                fontWeight = FontWeight.Bold,
                                fontFamily = FontFamily.Serif,
                                color = InkDark
                            )
                            Text(
                                text = if (isFr) "Diagnostic & Configuration" else "Audio engine status & tips",
                                fontSize = 11.sp,
                                color = InkSoft
                            )
                        }
                    }

                    IconButton(
                        onClick = onDismiss,
                        modifier = Modifier.testTag("close_voice_help_button")
                    ) {
                        Text(text = "✕", fontSize = 16.sp, color = InkSoft, fontWeight = FontWeight.Bold)
                    }
                }

                // Diagnostics Card
                Card(
                    modifier = Modifier.fillMaxWidth(),
                    shape = RoundedCornerShape(12.dp),
                    colors = CardDefaults.cardColors(containerColor = WhitePure.copy(alpha = 0.9f)),
                    border = androidx.compose.foundation.BorderStroke(1.dp, SheetBorder)
                ) {
                    Column(
                        modifier = Modifier.padding(12.dp),
                        verticalArrangement = Arrangement.spacedBy(10.dp)
                    ) {
                        // Native TTS status
                        Row(
                            modifier = Modifier.fillMaxWidth(),
                            horizontalArrangement = Arrangement.SpaceBetween,
                            verticalAlignment = Alignment.CenterVertically
                        ) {
                            Text(
                                text = if (isFr) "Moteur TTS Android (am-ET) :" else "Android TTS engine (am-ET):",
                                fontSize = 12.sp,
                                color = InkDark
                            )
                            Row(
                                verticalAlignment = Alignment.CenterVertically,
                                horizontalArrangement = Arrangement.spacedBy(4.dp)
                            ) {
                                Box(
                                    modifier = Modifier
                                        .size(8.dp)
                                        .background(
                                            if (audioState.hasNativeVoice) EmeraldGreen else GoldAccent,
                                            CircleShape
                                        )
                                )
                                Text(
                                    text = if (audioState.hasNativeVoice) {
                                        if (isFr) "Installé" else "Installed"
                                    } else {
                                        if (isFr) "Non détecté" else "Not detected"
                                    },
                                    fontSize = 11.sp,
                                    fontWeight = FontWeight.Bold,
                                    color = if (audioState.hasNativeVoice) EmeraldGreen else GoldAccent
                                )
                            }
                        }

                        // Online Fallback status
                        Row(
                            modifier = Modifier.fillMaxWidth(),
                            horizontalArrangement = Arrangement.SpaceBetween,
                            verticalAlignment = Alignment.CenterVertically
                        ) {
                            Text(
                                text = if (isFr) "Voix en ligne (Google Cloud) :" else "Online TTS (Google Cloud):",
                                fontSize = 12.sp,
                                color = InkDark
                            )
                            Row(
                                verticalAlignment = Alignment.CenterVertically,
                                horizontalArrangement = Arrangement.spacedBy(4.dp)
                            ) {
                                Icon(
                                    imageVector = if (audioState.isOnline) Icons.Default.Wifi else Icons.Default.WifiOff,
                                    contentDescription = null,
                                    tint = if (audioState.isOnline) EmeraldGreen else CrimsonRed,
                                    modifier = Modifier.size(14.dp)
                                )
                                Text(
                                    text = if (audioState.isOnline) {
                                        if (isFr) "Prêt (connecté)" else "Ready (online)"
                                    } else {
                                        if (isFr) "Hors ligne" else "Offline"
                                    },
                                    fontSize = 11.sp,
                                    fontWeight = FontWeight.Bold,
                                    color = if (audioState.isOnline) EmeraldGreen else CrimsonRed
                                )
                            }
                        }
                    }
                }

                // Helpful Advice
                Text(
                    text = if (isFr) {
                        "• L'application prononce instantanément chaque lettre et mot sélectionné.\n• Si vous êtes en ligne, la voix amharique claire de Google est utilisée comme flux sonore automatique.\n• Pour installer la voix amharique hors-ligne : allez dans Paramètres Android > Système > Synthèse vocale > Installer les données vocales amhariques."
                    } else {
                        "• The app provides instant pronunciation for every glyph and vocabulary word.\n• When connected to the internet, Google's high-fidelity Amharic voice is streamed automatically.\n• For offline usage, install Amharic in your Android system settings under Accessibility / Text-to-speech."
                    },
                    fontSize = 11.sp,
                    color = InkSoft,
                    lineHeight = 16.sp
                )

                // Test Voice Button
                Button(
                    onClick = onTestVoice,
                    modifier = Modifier
                        .fillMaxWidth()
                        .testTag("test_voice_button"),
                    shape = RoundedCornerShape(10.dp),
                    colors = ButtonDefaults.buttonColors(
                        containerColor = EmeraldGreen,
                        contentColor = WhitePure
                    )
                ) {
                    Row(
                        verticalAlignment = Alignment.CenterVertically,
                        horizontalArrangement = Arrangement.spacedBy(6.dp)
                    ) {
                        Icon(imageVector = Icons.Default.VolumeUp, contentDescription = null, modifier = Modifier.size(16.dp))
                        Text(
                            text = if (isFr) "Tester la voix (« ሰላም » - Selam)" else "Test voice (\"ሰላም\" - Selam)",
                            fontSize = 13.sp,
                            fontWeight = FontWeight.Bold
                        )
                    }
                }
            }
        }
    }
}
