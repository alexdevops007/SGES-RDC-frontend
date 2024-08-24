<template>
  <div
    class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4"
  >
    <div class="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
      <slot></slot>
      <div class="mt-4 flex justify-end">
        <button
          @click="$emit('close')"
          class="text-gray-500 font-bold py-2 px-4 rounded mr-2 focus:outline-none focus:shadow-outline"
        >
          Annuler
        </button>
        <button
          @click="$emit('confirm')"
          class="bg-red-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Confirmer
        </button>
      </div>
    </div>
  </div>
</template>
