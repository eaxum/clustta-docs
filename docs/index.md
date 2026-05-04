---
layout: page
---

<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vitepress'

onMounted(() => {
  const router = useRouter()
  router.go('/guide/introduction')
})
</script>

<meta http-equiv="refresh" content="0;url=/guide/introduction">

