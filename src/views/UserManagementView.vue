<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold mb-4">Gestion des Utilisateurs</h1>
    <UserList />
  </div>
</template>

<script>
import UserList from '@/components/users/UserList.vue';

export default {
  components: {
    UserList,
  },
};
</script>
