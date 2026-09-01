package com.example.fidel.ui.components

import androidx.compose.foundation.Canvas
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.gestures.detectDragGestures
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.ExperimentalLayoutApi
import androidx.compose.foundation.layout.FlowRow
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.Undo
import androidx.compose.material.icons.filled.AutoAwesome
import androidx.compose.material.icons.filled.Clear
import androidx.compose.material.icons.filled.Delete
import androidx.compose.material.icons.filled.Edit
import androidx.compose.material.icons.filled.VolumeUp
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
import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.Path
import androidx.compose.ui.graphics.StrokeCap
import androidx.compose.ui.graphics.StrokeJoin
import androidx.compose.ui.graphics.drawscope.Stroke
import androidx.compose.ui.graphics.nativeCanvas
import androidx.compose.ui.input.pointer.pointerInput
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.fidel.data.ORDER_NAMES
import com.example.fidel.model.DrawingPath
import com.example.fidel.model.FidelFamily
import com.example.fidel.model.Language
import com.example.fidel.ui.theme.CrimsonRed
import com.example.fidel.ui.theme.EmeraldGreen
import com.example.fidel.ui.theme.GoldAccent
import com.example.fidel.ui.theme.GoldSoft
import com.example.fidel.ui.theme.InkDark
import com.example.fidel.ui.theme.InkMuted
import com.example.fidel.ui.theme.InkSoft
import com.example.fidel.ui.theme.PaperBg
import com.example.fidel.ui.theme.PaperSheet
import com.example.fidel.ui.theme.SheetBorder
import com.example.fidel.ui.theme.SheetLine
import com.example.fidel.ui.theme.WhitePure

@OptIn(ExperimentalLayoutApi::class)
@Composable
fun TracingSection(
    fidel: FidelFamily,
    activeIdx: Int,
    penColor: Color,
    strokeWidth: Float,
    isEraser: Boolean,
    paths: List<DrawingPath>,
    currentStroke: List<Offset>,
    lang: Language,
    onSelectForm: (Int) -> Unit,
    onColorChange: (Color) -> Unit,
    onStrokeWidthChange: (Float) -> Unit,
    onToggleEraser: () -> Unit,
    onStartStroke: (Offset) -> Unit,
    onAddPoint: (Offset) -> Unit,
    onEndStroke: () -> Unit,
    onUndo: () -> Unit,
    onClear: () -> Unit,
    onSpeak: (String) -> Unit,
    modifier: Modifier = Modifier
) {
    val isFr = lang == Language.FR
    val activeGlyph = fidel.forms.getOrNull(activeIdx) ?: fidel.base
    val orderName = ORDER_NAMES.getOrNull(activeIdx)
    val colorPalette = listOf(
        InkDark,
        EmeraldGreen,
        CrimsonRed,
        GoldAccent
    )

    Column(
        modifier = modifier
            .fillMaxWidth()
            .padding(bottom = 20.dp),
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
                    text = "5.",
                    fontSize = 20.sp,
                    fontWeight = FontWeight.Bold,
                    fontFamily = FontFamily.Serif,
                    color = GoldAccent
                )
                Text(
                    text = if (isFr) "Atelier de calligraphie & tracé" else "Tracing & Calligraphy Canvas",
                    fontSize = 17.sp,
                    fontWeight = FontWeight.Bold,
                    fontFamily = FontFamily.Serif,
                    color = InkDark
                )
            }

            Surface(
                modifier = Modifier
                    .clip(RoundedCornerShape(6.dp))
                    .clickable { onSpeak(activeGlyph) }
                    .testTag("trace_speak_glyph_button"),
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
                        imageVector = Icons.Default.VolumeUp,
                        contentDescription = "Pronounce",
                        tint = GoldAccent,
                        modifier = Modifier.size(14.dp)
                    )
                    Text(
                        text = activeGlyph,
                        fontSize = 13.sp,
                        fontWeight = FontWeight.Bold,
                        color = EmeraldGreen
                    )
                }
            }
        }

        Text(
            text = if (isFr) {
                "Sélectionnez une forme parmi les 7 ordres, puis tracez-la au doigt sur les lignes de cahier :"
            } else {
                "Pick one of the 7 forms below, then trace its strokes on the notebook canvas:"
            },
            fontSize = 12.sp,
            color = InkSoft,
            lineHeight = 16.sp
        )

        // 7 Forms Selector Tabs
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .testTag("tracing_form_tabs"),
            horizontalArrangement = Arrangement.spacedBy(4.dp)
        ) {
            fidel.forms.forEachIndexed { index, form ->
                val isSelected = index == activeIdx
                Surface(
                    modifier = Modifier
                        .weight(1f)
                        .clip(RoundedCornerShape(8.dp))
                        .clickable { onSelectForm(index) }
                        .testTag("trace_form_tab_$index"),
                    shape = RoundedCornerShape(8.dp),
                    color = if (isSelected) EmeraldGreen else WhitePure.copy(alpha = 0.85f),
                    border = androidx.compose.foundation.BorderStroke(
                        1.dp,
                        if (isSelected) EmeraldGreen else SheetBorder
                    )
                ) {
                    Column(
                        modifier = Modifier.padding(vertical = 4.dp),
                        horizontalAlignment = Alignment.CenterHorizontally
                    ) {
                        Text(
                            text = form,
                            fontSize = 18.sp,
                            fontWeight = FontWeight.Bold,
                            color = if (isSelected) WhitePure else InkDark
                        )
                        Text(
                            text = "${index + 1}",
                            fontSize = 9.sp,
                            color = if (isSelected) WhitePure.copy(alpha = 0.8f) else InkSoft
                        )
                    }
                }
            }
        }

        // Active letter order info badge
        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.SpaceBetween,
            verticalAlignment = Alignment.CenterVertically
        ) {
            Text(
                text = "${if (isFr) "Ordre" else "Order"} ${activeIdx + 1} : ${orderName?.nameAmh ?: ""} (${if (isFr) orderName?.nameFr else orderName?.nameEn})",
                fontSize = 12.sp,
                fontWeight = FontWeight.SemiBold,
                color = InkDark
            )
            Text(
                text = "${if (isFr) "Voyelle :" else "Vowel:"} ${orderName?.vowel ?: ""}",
                fontSize = 11.sp,
                color = GoldAccent,
                fontWeight = FontWeight.Medium
            )
        }

        // Canvas Paper Container Card
        Card(
            modifier = Modifier
                .fillMaxWidth()
                .height(230.dp)
                .testTag("drawing_canvas_card"),
            shape = RoundedCornerShape(14.dp),
            colors = CardDefaults.cardColors(containerColor = PaperSheet),
            border = androidx.compose.foundation.BorderStroke(1.5.dp, SheetBorder),
            elevation = CardDefaults.cardElevation(defaultElevation = 2.dp)
        ) {
            Box(modifier = Modifier.fillMaxSize()) {
                // Compose Canvas for guideline lines, watermark letter, and drawings
                Canvas(
                    modifier = Modifier
                        .fillMaxSize()
                        .pointerInput(isEraser, penColor, strokeWidth) {
                            detectDragGestures(
                                onDragStart = { offset ->
                                    onStartStroke(offset)
                                },
                                onDrag = { change, _ ->
                                    change.consume()
                                    onAddPoint(change.position)
                                },
                                onDragEnd = {
                                    onEndStroke()
                                },
                                onDragCancel = {
                                    onEndStroke()
                                }
                            )
                        }
                        .testTag("drawing_canvas_interactive")
                ) {
                    val canvasWidth = size.width
                    val canvasHeight = size.height

                    // 1. Draw traditional copybook horizontal guidelines
                    val lineSpacing = canvasHeight / 5
                    for (i in 1..4) {
                        val y = lineSpacing * i
                        drawLine(
                            color = SheetLine,
                            start = Offset(0f, y),
                            end = Offset(canvasWidth, y),
                            strokeWidth = if (i == 2 || i == 3) 1.5f else 1.0f
                        )
                    }

                    // 2. Red margin line on left
                    drawLine(
                        color = CrimsonRed.copy(alpha = 0.25f),
                        start = Offset(32.dp.toPx(), 0f),
                        end = Offset(32.dp.toPx(), canvasHeight),
                        strokeWidth = 1.5f
                    )

                    // 3. Watermark Ghost Letter in center
                    drawContext.canvas.nativeCanvas.apply {
                        val paint = android.graphics.Paint().apply {
                            color = android.graphics.Color.argb(32, 40, 50, 74)
                            textSize = canvasHeight * 0.72f
                            textAlign = android.graphics.Paint.Align.CENTER
                            isAntiAlias = true
                            typeface = android.graphics.Typeface.SERIF
                        }
                        val fontMetrics = paint.fontMetrics
                        val baseline = (canvasHeight / 2) - (fontMetrics.ascent + fontMetrics.descent) / 2
                        drawText(activeGlyph, canvasWidth / 2, baseline, paint)
                    }

                    // 4. Completed drawing paths
                    for (pathItem in paths) {
                        if (pathItem.points.size < 2) continue
                        val path = Path().apply {
                            moveTo(pathItem.points.first().x, pathItem.points.first().y)
                            for (p in pathItem.points.drop(1)) {
                                lineTo(p.x, p.y)
                            }
                        }
                        drawPath(
                            path = path,
                            color = if (pathItem.isEraser) PaperSheet else pathItem.color,
                            style = Stroke(
                                width = pathItem.strokeWidth,
                                cap = StrokeCap.Round,
                                join = StrokeJoin.Round
                            )
                        )
                    }

                    // 5. Current active stroke
                    if (currentStroke.size >= 2) {
                        val currentPath = Path().apply {
                            moveTo(currentStroke.first().x, currentStroke.first().y)
                            for (p in currentStroke.drop(1)) {
                                lineTo(p.x, p.y)
                            }
                        }
                        drawPath(
                            path = currentPath,
                            color = if (isEraser) PaperSheet else penColor,
                            style = Stroke(
                                width = if (isEraser) strokeWidth * 2.5f else strokeWidth,
                                cap = StrokeCap.Round,
                                join = StrokeJoin.Round
                            )
                        )
                    }
                }
            }
        }

        // Canvas Tooling Controls
        Surface(
            modifier = Modifier.fillMaxWidth(),
            shape = RoundedCornerShape(10.dp),
            color = WhitePure.copy(alpha = 0.9f),
            border = androidx.compose.foundation.BorderStroke(1.dp, SheetBorder)
        ) {
            Row(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(8.dp),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically
            ) {
                // Color Palette
                Row(
                    horizontalArrangement = Arrangement.spacedBy(6.dp),
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    colorPalette.forEach { col ->
                        val isSelected = !isEraser && penColor == col
                        Surface(
                            modifier = Modifier
                                .size(26.dp)
                                .clip(CircleShape)
                                .clickable { onColorChange(col) }
                                .testTag("color_picker_${col.hashCode()}"),
                            shape = CircleShape,
                            color = col,
                            border = androidx.compose.foundation.BorderStroke(
                                if (isSelected) 2.5.dp else 1.dp,
                                if (isSelected) GoldAccent else SheetBorder
                            )
                        ) {}
                    }
                }

                // Stroke width buttons
                Row(
                    horizontalArrangement = Arrangement.spacedBy(4.dp),
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    listOf(
                        6f to (if (isFr) "Fin" else "Fine"),
                        12f to (if (isFr) "Moyen" else "Medium"),
                        20f to (if (isFr) "Épais" else "Thick")
                    ).forEach { (w, label) ->
                        val isSelected = strokeWidth == w
                        Surface(
                            modifier = Modifier
                                .clip(RoundedCornerShape(6.dp))
                                .clickable { onStrokeWidthChange(w) }
                                .testTag("stroke_width_$w"),
                            shape = RoundedCornerShape(6.dp),
                            color = if (isSelected) GoldSoft.copy(alpha = 0.5f) else PaperBg.copy(alpha = 0.5f),
                            border = androidx.compose.foundation.BorderStroke(
                                1.dp,
                                if (isSelected) GoldAccent else SheetBorder
                            )
                        ) {
                            Text(
                                text = label,
                                fontSize = 10.sp,
                                fontWeight = if (isSelected) FontWeight.Bold else FontWeight.Normal,
                                color = InkDark,
                                modifier = Modifier.padding(horizontal = 6.dp, vertical = 4.dp)
                            )
                        }
                    }
                }

                // Action Buttons: Eraser, Undo, Clear
                Row(
                    horizontalArrangement = Arrangement.spacedBy(4.dp),
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    // Eraser Toggle
                    Surface(
                        modifier = Modifier
                            .clip(RoundedCornerShape(6.dp))
                            .clickable { onToggleEraser() }
                            .testTag("eraser_toggle_button"),
                        shape = RoundedCornerShape(6.dp),
                        color = if (isEraser) CrimsonRed else PaperBg.copy(alpha = 0.6f),
                        border = androidx.compose.foundation.BorderStroke(
                            1.dp,
                            if (isEraser) CrimsonRed else SheetBorder
                        )
                    ) {
                        Box(
                            modifier = Modifier.size(30.dp),
                            contentAlignment = Alignment.Center
                        ) {
                            Text(
                                text = "⌫",
                                fontSize = 14.sp,
                                fontWeight = FontWeight.Bold,
                                color = if (isEraser) WhitePure else InkDark
                            )
                        }
                    }

                    // Undo Button
                    Surface(
                        modifier = Modifier
                            .clip(RoundedCornerShape(6.dp))
                            .clickable { onUndo() }
                            .testTag("undo_stroke_button"),
                        shape = RoundedCornerShape(6.dp),
                        color = PaperBg.copy(alpha = 0.6f),
                        border = androidx.compose.foundation.BorderStroke(1.dp, SheetBorder)
                    ) {
                        Box(
                            modifier = Modifier.size(30.dp),
                            contentAlignment = Alignment.Center
                        ) {
                            Icon(
                                imageVector = Icons.AutoMirrored.Filled.Undo,
                                contentDescription = "Undo",
                                tint = InkDark,
                                modifier = Modifier.size(16.dp)
                            )
                        }
                    }

                    // Clear Canvas Button
                    Surface(
                        modifier = Modifier
                            .clip(RoundedCornerShape(6.dp))
                            .clickable { onClear() }
                            .testTag("clear_canvas_button"),
                        shape = RoundedCornerShape(6.dp),
                        color = PaperBg.copy(alpha = 0.6f),
                        border = androidx.compose.foundation.BorderStroke(1.dp, SheetBorder)
                    ) {
                        Box(
                            modifier = Modifier.size(30.dp),
                            contentAlignment = Alignment.Center
                        ) {
                            Icon(
                                imageVector = Icons.Default.Delete,
                                contentDescription = "Clear",
                                tint = CrimsonRed,
                                modifier = Modifier.size(16.dp)
                            )
                        }
                    }
                }
            }
        }
    }
}
