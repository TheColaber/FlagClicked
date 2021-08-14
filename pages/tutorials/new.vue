<template>
  <div class="container">
      <input type="text" placeholder="Title" v-model="title" />
      <div class="tutorial-editor">
        <textarea v-model="input"></textarea>
        <Renderer :content="input" />
      </div>
      <button @click="createTutorial">Create Tutorial</button>
      <Loading v-if="loading" />
    </div>
  </div>
</template>
<script>
export default {
  middleware: ["authenticated"],
  head() {
    return {
      title: "Create Tutorial",
    };
  },
  data() {
    return {
      input: "",
      title: "",
      loading: false,
    };
  },
  methods: {
    async createTutorial() {
      this.loading = true;
      let { data } = await this.$axios.put(
        `/api/tutorial/new`,
        {
          body: this.input,
          title: this.title,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      this.loading = false;

      if (data.id) return this.$router.push({ path: `/tutorials/${data.id}` });
    },
  },
};
</script>
<style>
.tutorial-editor {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  width: 100%;
}
textarea {
  resize: none;
  font-family: "Monaco", courier, monospace;
  padding: 20px;
  border-radius: 0px 0px 0px 10px;
  outline: none;
  border: black solid 4px;
}

input {
  padding: 10px;
  border-radius: 10px 10px 0px 0px;
  outline: none;
  border: black solid 4px;
  border-bottom: none;
}
button {
  width: fit-content;
}

.rendered {
  overflow: auto;
  padding: 20px;
  border-radius: 0px 0px 10px 0px;
  background: #000;
  border: black solid 4px;
}
</style>
