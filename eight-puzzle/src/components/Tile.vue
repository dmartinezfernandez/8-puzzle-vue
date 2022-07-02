<template>
  <div
    :style="{
      'grid-row': row,
      'grid-column': column,
      width: 'var(--tile-side)',
      height: 'var(--tile-side)',
      overflow: 'hidden',
      cursor: canSlide ? 'pointer' : 'default',
      opacity: opacity,
    }"
  >
    <img
      :src="imageSrc"
      :title="number"
      :style="{
        width: 'var(--board-side)',
        height: 'var(--board-side)',
        'margin-left': 'calc(var(--tile-side) * -' + ((number - 1) % 3) + ')',
        'margin-top':
          'calc(var(--tile-side) * -' + Math.trunc((number - 1) / 3) + ')',
      }"
    />
  </div>
</template>

<script>
"use strict";

export default {
  name: "Tile",
  props: {
    number: Number,
    row: Number,
    column: Number,
    imageSrc: String,
    opacity: String,
    canSlide: Boolean,
  },
};
</script>