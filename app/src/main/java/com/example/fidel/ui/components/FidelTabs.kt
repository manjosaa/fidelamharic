package com.example.fidel.ui.components

import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.lazy.LazyRow
import androidx.compose.foundation.lazy.itemsIndexed
import androidx.compose.foundation.lazy.rememberLazyListState
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.ArrowBack
import androidx.compose.material.icons.automirrored.filled.ArrowForward
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.fidel.data.FIDEL_DATA
import com.example.fidel.model.FidelFamily
import com.example.fidel.ui.theme.EmeraldGreen
import com.example.fidel.ui.theme.GoldAccent
import com.example.fidel.ui.theme.InkDark
import com.example.fidel.ui.theme.InkSoft
import com.example.fidel.ui.theme.PaperSheet
import com.example.fidel.ui.theme.SheetBorder
import com.example.fidel.ui.theme.WhitePure

@Composable
fun FidelTabs(
    currentFidel: FidelFamily,
    onSelectFidel: (FidelFamily) -> Unit,
    modifier: Modifier = Modifier
) {
    val listState = rememberLazyListState()
    val currentIndex = FIDEL_DATA.indexOfFirst { it.base == currentFidel.base }

    LaunchedEffect(currentFidel.base) {
        if (currentIndex >= 0) {
            listState.animateScrollToItem(maxOf(0, currentIndex - 2))
        }
    }

    val prevFidel = if (currentIndex > 0) FIDEL_DATA[currentIndex - 1] else null
    val nextFidel = if (currentIndex < FIDEL_DATA.size - 1) FIDEL_DATA[currentIndex + 1] else null

    Row(
        modifier = modifier
            .fillMaxWidth()
            .padding(bottom = 6.dp),
        verticalAlignment = Alignment.CenterVertically,
        horizontalArrangement = Arrangement.spacedBy(4.dp)
    ) {
        // Prev button
        if (prevFidel != null) {
            Surface(
                modifier = Modifier
                    .clip(RoundedCornerShape(8.dp))
                    .clickable { onSelectFidel(prevFidel) }
                    .testTag("tab_prev_button"),
                shape = RoundedCornerShape(8.dp),
                color = WhitePure,
                border = androidx.compose.foundation.BorderStroke(1.dp, SheetBorder)
            ) {
                Box(
                    modifier = Modifier
                        .size(36.dp),
                    contentAlignment = Alignment.Center
                ) {
                    Icon(
                        imageVector = Icons.AutoMirrored.Filled.ArrowBack,
                        contentDescription = "Previous Letter",
                        tint = InkDark,
                        modifier = Modifier.size(16.dp)
                    )
                }
            }
        }

        // Horizontal List of 33 Tabs
        LazyRow(
            state = listState,
            modifier = Modifier
                .weight(1f)
                .testTag("fidel_tabs_row"),
            horizontalArrangement = Arrangement.spacedBy(4.dp)
        ) {
            itemsIndexed(FIDEL_DATA) { _, item ->
                val isSelected = item.base == currentFidel.base
                Surface(
                    modifier = Modifier
                        .clip(RoundedCornerShape(topStart = 8.dp, topEnd = 8.dp, bottomStart = 4.dp, bottomEnd = 4.dp))
                        .clickable { onSelectFidel(item) }
                        .testTag("tab_fidel_${item.base}"),
                    shape = RoundedCornerShape(topStart = 8.dp, topEnd = 8.dp, bottomStart = 4.dp, bottomEnd = 4.dp),
                    color = if (isSelected) PaperSheet else WhitePure.copy(alpha = 0.85f),
                    border = androidx.compose.foundation.BorderStroke(
                        if (isSelected) 1.5.dp else 1.dp,
                        if (isSelected) GoldAccent else SheetBorder
                    )
                ) {
                    Box(
                        modifier = Modifier
                            .height(40.dp)
                            .padding(horizontal = 10.dp),
                        contentAlignment = Alignment.Center
                    ) {
                        Text(
                            text = item.base,
                            fontSize = if (isSelected) 20.sp else 18.sp,
                            fontWeight = if (isSelected) FontWeight.Bold else FontWeight.Medium,
                            color = if (isSelected) EmeraldGreen else InkSoft
                        )
                    }
                }
            }
        }

        // Next button
        if (nextFidel != null) {
            Surface(
                modifier = Modifier
                    .clip(RoundedCornerShape(8.dp))
                    .clickable { onSelectFidel(nextFidel) }
                    .testTag("tab_next_button"),
                shape = RoundedCornerShape(8.dp),
                color = WhitePure,
                border = androidx.compose.foundation.BorderStroke(1.dp, SheetBorder)
            ) {
                Box(
                    modifier = Modifier
                        .size(36.dp),
                    contentAlignment = Alignment.Center
                ) {
                    Icon(
                        imageVector = Icons.AutoMirrored.Filled.ArrowForward,
                        contentDescription = "Next Letter",
                        tint = InkDark,
                        modifier = Modifier.size(16.dp)
                    )
                }
            }
        }
    }
}
