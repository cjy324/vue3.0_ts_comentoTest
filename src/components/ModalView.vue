<template> 
  <div class="modal">
    <div class="overlay">
    </div> 
    <div class="modal_card">
      <button class="closeBtn" @click="$emit('close-modal')">
        <img src="../images/그룹560.png" alt="">
      </button>  
      <span>
        필터
      </span>
      <slot/>
      <button class="saveBtn" @click="$emit('save-category')">
        저장하기
      </button>  
    </div> 
  </div> 
</template> 

<script lang="ts"> 
import { defineComponent } from 'vue'

export default defineComponent({  
  name: 'ModalView'
})
</script> 

<style lang="scss" scoped> 
/* Modal */ 
.modal, .overlay { 
  width: 100%; 
  height: 100%; 
  position: fixed; 
  left: 0; 
  top: 0; 
} 
.overlay { 
  opacity: 0.5; 
  background-color: black; 
} 
.modal_card { 
  position: relative; 
  width: 80%;
  max-width: 430px; 
  margin: auto; 
  margin-top: 130px; 
  padding: 30px; 
  background-color: white; 
  z-index: 10; 
  opacity: 1; 
}
.closeBtn{
  position: absolute;
  top: 15px;
  right: 15px;
  width: 12px;
  height: 12px;
}
.modal_card > span {
  color: var(--unnamed-color-212529);
  text-align: left;
  font: normal normal bold 22px/32px SpoqaHanSans;
  letter-spacing: 0px;
  opacity: 1;
}
.saveBtn{
  width: 100%;
  height: 40px;
  background: var(--unnamed-color-00c854) 0% 0% no-repeat padding-box;
  border-radius: 3px;
  opacity: 1;
  color: var(--unnamed-color-ffffff);
  font: normal normal normal 16px/32px SpoqaHanSans;
  letter-spacing: 0px;
}


@media ( min-width:769px ) {
  .modal_card{
    margin-top: 280px;
  }
  .saveBtn{
    margin-left: 330px;
    width: 99px;
  }
}

</style>

