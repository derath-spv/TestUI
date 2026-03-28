<template>
  <div class="relative w-full h-32 bg-indigo-50/50 rounded-xl overflow-hidden flex items-center justify-center">
    <svg viewBox="0 0 360 180" class="w-full h-full opacity-20" fill="#6366f1">
      <!-- Simplified world map shapes -->
      <!-- North America -->
      <path d="M50,30 L90,25 L110,40 L105,60 L85,70 L60,65 L45,50 Z" />
      <!-- South America -->
      <path d="M80,80 L95,75 L105,90 L100,120 L85,135 L75,120 L70,95 Z" />
      <!-- Europe -->
      <path d="M160,25 L185,20 L195,30 L190,45 L175,50 L160,40 Z" />
      <!-- Africa -->
      <path d="M165,55 L185,50 L195,65 L190,100 L175,110 L160,95 L155,70 Z" />
      <!-- Asia -->
      <path d="M200,20 L260,15 L280,30 L275,55 L250,65 L220,60 L200,45 Z" />
      <!-- Australia -->
      <path d="M265,95 L290,90 L300,100 L295,115 L275,118 L265,108 Z" />
    </svg>
    <!-- Map dots representing employees -->
    <div class="absolute top-6 left-1/4 w-2 h-2 bg-indigo-500 rounded-full animate-pulse"></div>
    <div class="absolute top-10 left-1/2 w-3 h-3 bg-indigo-500 rounded-full animate-pulse"></div>
    <div class="absolute top-8 right-1/4 w-2 h-2 bg-indigo-400 rounded-full animate-pulse"></div>
  </div>
</template>
