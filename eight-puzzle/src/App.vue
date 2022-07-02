<template>
  <div id="app">
    <Board
      :key="componentKey"
      :imageSrc="require('./assets/default.jpg')"
      class="board"
      ref="board"
    />

    <!-- Controls -->
    <aside>
      <input type="button" value="Shuffle" @click="shuffle" />&nbsp;
      <input type="button" value="Initialize" @click="initialize" />
      <br />
      <img
        src="./assets/default.jpg"
        style="
          width: calc(var(--tile-side) * 0.66);
          height: calc(var(--tile-side) * 0.66);
          margin-top: 8px;
        "
      />
      <br />
      <br />
      8-puzzle
      <br />
      <a href=".?mode=kids">Kids</a>/<a href=".?mode=random">random</a> mode
      <br />
      <footer class="darker">
        &copy; 2021 Daniel Martínez Fernández
        <br />MIT License
      </footer>

      <div style="display: none">
        <!-- Hidden file input: -->
        <input type="file" name="file" id="file" ref="fileInput" />
        <!-- Customized button for file input: -->
        <input type="button" value="Change picture..." @click="changePicture" />
        <br />
        <br />
      </div>
      <br />

      <!--        3x3 tiles square...
        <br />? https://codepen.io/Escu/pen/KVLBYP
        <br />
        <br />https://stackoverflow.com/questions/53810434/crop-the-image-using-javascript
        <br />https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/drawImage
        <br />
        <br />https://stackoverflow.com/questions/40177493/drawing-onto-a-canvas-with-vue-js
        <br />

        <br />https://www.cs.princeton.edu/courses/archive/spr10/cos226/assignments/8puzzle.html
      -->
    </aside>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import Board from "./components/Board.vue";
import model from "./components/model";

export default {
  name: "App",
  components: {
    Board,
  },
  setup() {
    let kidsMode =
      new URLSearchParams(window.location.search).get("mode") === "kids";
    console.log("?mode=kids " + kidsMode);
    const changePicture = ref(null);
    const fileInput = ref(null);
    const componentKey = ref(false);
    onMounted(() => {
      changePicture.value = () => {
        // Trigger click event on file input HTML element from customized button.
        fileInput.value.click();
      };
    });

    const shuffle = ref(() => {
      console.clear();
      model.game.shuffle(kidsMode);
      componentKey.value = !componentKey.value;
    });
    const initialize = ref(() => {
      console.clear();
      model.game.initialize();
      componentKey.value = !componentKey.value;
    });
    return {
      changePicture,
      fileInput,
      shuffle,
      initialize,
      componentKey,
    };
  },
};
</script>

<style scoped>
.board {
  vertical-align: top;
}

aside {
  display: inline-block;
  padding: 8px;
}

input[type="file"] {
  width: 0px;
  opacity: 0;
  overflow: hidden;
}

input[type="button"] {
  background-color: #0043ce /* Blue 30 */;
  font: inherit;
  cursor: pointer;
  font-size: 1.8em;
}
</style>>
