<template>
  <div class="navbar">
    <NuxtLink class="item left" to="/">
      when
      <img src="/greenflag.svg" class="logo" />
      clicked
    </NuxtLink>

    <div class="item">
      <NuxtLink class="button" to="/explore">Explore</NuxtLink>
    </div>

    <template v-if="$auth.user">
      <div class="item" data-small1>
        <NuxtLink class="button" to="/tutorials">My Tutorials</NuxtLink>
      </div>
      <div class="item" data-small2>
        <NuxtLink class="button" to="/tutorials/new">New Tutorial</NuxtLink>
      </div>

      <NuxtLink to="/settings" class="item">
        <span class="username" data-small3>{{ $auth.user.username }}</span>
        <img
          :src="
            `https://cdn2.scratch.mit.edu/get_image/user/${$auth.user.id}_500x500.png`
          "
        />
      </NuxtLink>
    </template>

    <template v-else>
      <div class="item" data-small3>
        <NuxtLink class="button" to="/about">About</NuxtLink>
      </div>
      <NuxtLink to="/login" class="item right">
        <span>Login</span>
      </NuxtLink>
    </template>
  </div>
</template>

<style scoped>
.navbar {
  background: #ffbf00;
  display: flex;
  padding: 0px 10px;
}

.item {
  display: flex;
  font-size: 22px;
  align-items: center;
  user-select: none;
  height: 55px;
  justify-content: center;
  flex: 1;
  text-decoration: none;
}
.button {
  display: flex;
  font-size: 18px;
  justify-content: center;
  color: #5d657c;
  background: white;
  border-radius: 20pc;
  border: #00000045 solid 2px;
  padding: 4px 10px;
  text-decoration: none;
}

.button:hover {
  border-width: 0px;
  box-shadow: 0px 0px 8px #888888;
}

.item img {
  width: 30px;
  height: 30px;
}

.left {
  flex: 0;
  padding: 0px 2%;
}
.right {
  flex: 0;
  padding: 0px 2%;
}

.username {
  padding: 0px 10px;
  text-overflow: ellipsis;
  overflow: hidden;
  max-width: 160px;
}

.logo {
  padding: 0px 4px;
}

@media (max-width: 955px) {
  [data-small1] {
    display: none;
  }
}
@media (max-width: 800px) {
  [data-small2] {
    display: none;
  }
}
@media (max-width: 400px) {
  [data-small3] {
    display: none;
  }
}
</style>
