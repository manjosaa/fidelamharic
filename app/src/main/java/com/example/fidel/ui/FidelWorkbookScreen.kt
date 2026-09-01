package com.example.fidel.ui

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.statusBarsPadding
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.AutoAwesome
import androidx.compose.material.icons.filled.Edit
import androidx.compose.material.icons.filled.School
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.HorizontalDivider
import androidx.compose.material3.Icon
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.draw.shadow
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.fidel.data.FIDEL_DATA
import com.example.fidel.model.Language
import com.example.fidel.ui.components.FidelChartSection
import com.example.fidel.ui.components.FidelTabs
import com.example.fidel.ui.components.HeaderBar
import com.example.fidel.ui.components.MissingSequenceSection
import com.example.fidel.ui.components.TracingSection
import com.example.fidel.ui.components.VoiceHelpDialog
import com.example.fidel.ui.components.WordHuntSection
import com.example.fidel.ui.components.WordMatchSection
import com.example.fidel.ui.theme.CrimsonRed
import com.example.fidel.ui.theme.EmeraldGreen
import com.example.fidel.ui.theme.GoldAccent
import com.example.fidel.ui.theme.InkDark
import com.example.fidel.ui.theme.InkMuted
import com.example.fidel.ui.theme.InkSoft
import com.example.fidel.ui.theme.PaperBg
import com.example.fidel.ui.theme.PaperSheet
import com.example.fidel.ui.theme.SheetBorder
import com.example.fidel.ui.theme.SheetLine
import com.example.fidel.ui.theme.WhitePure
import com.example.fidel.viewmodel.FidelViewModel

@Composable
fun FidelWorkbookScreen(
    viewModel: FidelViewModel,
    modifier: Modifier = Modifier
) {
    val uiState by viewModel.uiState.collectAsState()
    val audioState by viewModel.speechService.audioState.collectAsState()
    val isFr = uiState.language == Language.FR
    val scrollState = rememberScrollState()

    Scaffold(
        modifier = modifier
            .fillMaxSize()
            .background(PaperBg),
        containerColor = PaperBg
    ) { innerPadding ->
        Column(
            modifier = Modifier
                .fillMaxSize()
                .padding(innerPadding)
                .statusBarsPadding()
                .padding(horizontal = 12.dp, vertical = 6.dp)
                .verticalScroll(scrollState),
            verticalArrangement = Arrangement.spacedBy(8.dp)
        ) {
            // Header bar with language, audio help, answers toggle, new sheet
            HeaderBar(
                currentFidel = uiState.currentFidel,
                onSelectFidel = { viewModel.selectFidel(it) },
                lang = uiState.language,
                onToggleLang = { viewModel.toggleLanguage() },
                showKey = uiState.showKey,
                onToggleKey = { viewModel.toggleShowKey() },
                onNewSheet = { viewModel.randomizeSheet() },
                onOpenVoiceHelp = { viewModel.setVoiceHelpOpen(true) },
                audioState = audioState
            )

            // Horizontal tabs of all 33 Fidel letters
            FidelTabs(
                currentFidel = uiState.currentFidel,
                onSelectFidel = { viewModel.selectFidel(it) }
            )

            // The Worksheet Paper Card Container
            Card(
                modifier = Modifier
                    .fillMaxWidth()
                    .testTag("worksheet_paper_container"),
                shape = RoundedCornerShape(16.dp),
                colors = CardDefaults.cardColors(containerColor = PaperSheet),
                border = androidx.compose.foundation.BorderStroke(1.5.dp, SheetBorder),
                elevation = CardDefaults.cardElevation(defaultElevation = 3.dp)
            ) {
                Box(modifier = Modifier.fillMaxWidth()) {
                    // Traditional red margin line running along left side
                    Box(
                        modifier = Modifier
                            .padding(start = 24.dp)
                            .width(1.5.dp)
                            .matchParentSize()
                            .background(CrimsonRed.copy(alpha = 0.18f))
                    )

                    Column(
                        modifier = Modifier
                            .fillMaxWidth()
                            .padding(horizontal = 14.dp, vertical = 16.dp),
                        verticalArrangement = Arrangement.spacedBy(14.dp)
                    ) {
                        // Title Header inside worksheet
                        Row(
                            modifier = Modifier.fillMaxWidth(),
                            horizontalArrangement = Arrangement.SpaceBetween,
                            verticalAlignment = Alignment.CenterVertically
                        ) {
                            Column {
                                Row(
                                    verticalAlignment = Alignment.CenterVertically,
                                    horizontalArrangement = Arrangement.spacedBy(6.dp)
                                ) {
                                    Text(
                                        text = "የፊደል መልመጃ",
                                        fontSize = 22.sp,
                                        fontWeight = FontWeight.Bold,
                                        fontFamily = FontFamily.Serif,
                                        color = InkDark
                                    )
                                    Surface(
                                        shape = RoundedCornerShape(6.dp),
                                        color = EmeraldGreen.copy(alpha = 0.12f),
                                        border = androidx.compose.foundation.BorderStroke(1.dp, EmeraldGreen.copy(alpha = 0.3f))
                                    ) {
                                        Text(
                                            text = uiState.currentFidel.base,
                                            fontSize = 16.sp,
                                            fontWeight = FontWeight.Bold,
                                            color = EmeraldGreen,
                                            modifier = Modifier.padding(horizontal = 6.dp, vertical = 2.dp)
                                        )
                                    }
                                }
                                Text(
                                    text = if (isFr) {
                                        "Fiche de travail · Famille « ${uiState.currentFidel.name} »"
                                    } else {
                                        "Worksheet · Family '${uiState.currentFidel.name}'"
                                    },
                                    fontSize = 13.sp,
                                    color = InkSoft,
                                    fontFamily = FontFamily.Serif
                                )
                            }

                            // Student Name & Date Lines
                            Column(
                                horizontalAlignment = Alignment.End,
                                verticalArrangement = Arrangement.spacedBy(3.dp)
                            ) {
                                Text(
                                    text = if (isFr) "Nom : __________" else "Name: __________",
                                    fontSize = 11.sp,
                                    color = InkMuted
                                )
                                Text(
                                    text = if (isFr) "Date : __________" else "Date: __________",
                                    fontSize = 11.sp,
                                    color = InkMuted
                                )
                            }
                        }

                        HorizontalDivider(color = SheetBorder, thickness = 1.dp)

                        // 1. Fidel Chart Section
                        FidelChartSection(
                            fidel = uiState.currentFidel,
                            lang = uiState.language,
                            onSpeak = { viewModel.speak(it) }
                        )

                        HorizontalDivider(color = SheetBorder.copy(alpha = 0.6f), thickness = 1.dp)

                        // 2. Missing Sequence Quiz Section
                        MissingSequenceSection(
                            fidel = uiState.currentFidel,
                            missingIdx = uiState.missingIndex,
                            inputVal = uiState.sequenceInputVal,
                            verdict = uiState.sequenceVerdict,
                            options = uiState.sequenceOptions,
                            lang = uiState.language,
                            onInputChange = { viewModel.setSequenceInput(it) },
                            onOptionSelect = { viewModel.selectSequenceChip(it) },
                            onCheck = { viewModel.checkSequence() },
                            onRefresh = { viewModel.refreshSequenceQuiz() },
                            onSpeak = { viewModel.speak(it) }
                        )

                        HorizontalDivider(color = SheetBorder.copy(alpha = 0.6f), thickness = 1.dp)

                        // 3. Word Matching Quiz Section
                        WordMatchSection(
                            words = uiState.matchWords,
                            shuffledMeanings = uiState.shuffledMeanings,
                            selectedWordIdx = uiState.selectedWordIndex,
                            userMatches = uiState.userMatches,
                            isSubmitted = uiState.isMatchSubmitted,
                            showKey = uiState.showKey,
                            lang = uiState.language,
                            onWordClick = { viewModel.selectMatchWord(it) },
                            onMeaningClick = { viewModel.selectMatchMeaning(it) },
                            onClearMatch = { viewModel.clearMatch(it) },
                            onCheck = { viewModel.checkMatches() },
                            onRefresh = { viewModel.refreshMatchQuiz() },
                            onSpeak = { viewModel.speak(it) }
                        )

                        HorizontalDivider(color = SheetBorder.copy(alpha = 0.6f), thickness = 1.dp)

                        // 4. Word Hunt Section
                        WordHuntSection(
                            fidel = uiState.currentFidel,
                            huntWords = uiState.huntWords,
                            circledIndices = uiState.circledIndices,
                            showKey = uiState.showKey,
                            lang = uiState.language,
                            onToggleCircle = { viewModel.toggleHuntCircle(it) },
                            onRefresh = { viewModel.refreshHuntQuiz() }
                        )

                        HorizontalDivider(color = SheetBorder.copy(alpha = 0.6f), thickness = 1.dp)

                        // 5. Tracing & Calligraphy Section
                        TracingSection(
                            fidel = uiState.currentFidel,
                            activeIdx = uiState.activeTracingIndex,
                            penColor = uiState.penColor,
                            strokeWidth = uiState.strokeWidth,
                            isEraser = uiState.isEraser,
                            paths = uiState.drawingPaths,
                            currentStroke = uiState.currentStroke,
                            lang = uiState.language,
                            onSelectForm = { viewModel.selectTracingForm(it) },
                            onColorChange = { viewModel.setPenColor(it) },
                            onStrokeWidthChange = { viewModel.setStrokeWidth(it) },
                            onToggleEraser = { viewModel.toggleEraser() },
                            onStartStroke = { viewModel.startStroke(it) },
                            onAddPoint = { viewModel.addPointToStroke(it) },
                            onEndStroke = { viewModel.endStroke() },
                            onUndo = { viewModel.undoDrawing() },
                            onClear = { viewModel.clearDrawing() },
                            onSpeak = { viewModel.speak(it) }
                        )
                    }
                }
            }

            // Footer note
            Box(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(vertical = 8.dp),
                contentAlignment = Alignment.Center
            ) {
                Text(
                    text = if (isFr) "የፊደል መልመጃ · Apprentissage de l'alphabet amharique" else "የፊደል መልመጃ · Amharic Fidel Learning Workbook",
                    fontSize = 11.sp,
                    color = InkSoft,
                    fontFamily = FontFamily.Serif
                )
            }
        }
    }

    // Voice Help Dialog
    if (uiState.isVoiceHelpOpen) {
        VoiceHelpDialog(
            audioState = audioState,
            lang = uiState.language,
            onDismiss = { viewModel.setVoiceHelpOpen(false) },
            onTestVoice = { viewModel.speak("ሰላም") },
            onToggleForceOnline = { viewModel.speechService.toggleForceOnline() }
        )
    }
}
