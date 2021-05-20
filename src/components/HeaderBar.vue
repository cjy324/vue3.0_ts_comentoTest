<template>
  <section class="visible-md-up header-bar">
    <div class="title">
      <slot></slot>
    </div>
  </section>

  <section class="visible-sm-down m_header-bar">
    <div class="m_title">
      <slot></slot>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({ 
  
  name: 'HeaderBar'
})
</script>

<style lang="scss">
  /* PC */
 .header-bar{
   position: relative;
   width: 1920px;
   height: 70px;
   background: var(--unnamed-color-ffffff) 0% 0% no-repeat padding-box;
   box-shadow: 0px 1px 5px #00000012;
   opacity: 1;
 }
 .title{
   position: absolute;
   top: 23px;
   left: 390px;
   height: 24px;
   color: var(--unnamed-color-212529);
   text-align: left;
   font: normal normal normal 16px/25px Noto Sans CJK KR;
   letter-spacing: 0px;
   opacity: 1;
 }

  /* Mobile */
 .m_header-bar{
   position: relative;
   min-width: 375px;
   height: 45px;
   background: var(--unnamed-color-ffffff) 0% 0% no-repeat padding-box;
   box-shadow: 0px 2px 3px #00000012;
   opacity: 1;
 }
 .m_title{
   position: absolute;
   top: 11px;
   left: 15px;
   height: 24px;
   color: var(--unnamed-color-212529);
   text-align: left;
   font: normal normal normal 16px/25px SpoqaHanSans;
   letter-spacing: 0px;
   opacity: 1;
 }
  
</style> 