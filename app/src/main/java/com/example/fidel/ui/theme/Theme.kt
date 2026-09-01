package com.example.fidel.ui.theme

import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.lightColorScheme
import androidx.compose.runtime.Composable

private val LightColorScheme = lightColorScheme(
    primary = EmeraldGreen,
    onPrimary = WhitePure,
    primaryContainer = EmeraldLight,
    onPrimaryContainer = EmeraldGreen,
    secondary = GoldAccent,
    onSecondary = WhitePure,
    secondaryContainer = GoldSoft,
    onSecondaryContainer = InkDark,
    tertiary = CrimsonRed,
    onTertiary = WhitePure,
    tertiaryContainer = CrimsonLight,
    onTertiaryContainer = CrimsonRed,
    background = PaperBg,
    onBackground = InkDark,
    surface = PaperSheet,
    onSurface = InkDark,
    surfaceVariant = GoldLight,
    onSurfaceVariant = InkSoft,
    outline = SheetBorder
)

@Composable
fun FidelPracticeTheme(
    content: @Composable () -> Unit
) {
    MaterialTheme(
        colorScheme = LightColorScheme,
        typography = Typography,
        content = content
    )
}
