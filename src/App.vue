<template>
  <div id="app" class="center">
    <router-view />
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

input[type="button"] {
  background-color: #1abc9c;

  border: thin solid #16a085;
  border-radius: 4px;

  width: 200px;
  padding: 5px 0;

  color: white;
  font-weight: bold;

  cursor: pointer;
}

.align-right {
  text-align: right;
}

.center {
  margin: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}
</style>
