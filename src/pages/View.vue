<template>
  <HeaderBar>
    <span class="visible-md-up">[21.05.18] 최주영</span>
    <router-link to="list" class="visible-sm-down backBtn">&lt</router-link>
  </HeaderBar>
  <!-- PC -->
  <section class="visible-md-up main">
    <div class="main_box">
      <div class="detail_box">
        <div class="detail_content_box">
          <div class="content_box">
            <div class="content_box__title">{{state.article.title}}</div>
            <div class="content_box__contents">{{state.article.contents}}</div>
          </div>  
          <div class="created_at">
            created_at({{state.createdAt}})
          </div>
        </div>
        <div class="middle_box">
          <div class="countBox">
            <div class="countBox__title">답변</div>
            <div class="countBox__count">{{state.replyLength}}</div>
          </div>
        </div>
        <div class="comment_box" v-for="reply in state.replies.slice(0, state.limitNum)" :key="reply.id">
          <div class="header_box">
            <div class="reply_user_name">{{reply.user.name}}</div>
          </div>
          <div class="content_box">
            <div class="content_box__contents">{{reply.contents}}</div>
          </div>
          <div class="created_at">
            created_at({{reply.created_at.split('T')[0]}})
          </div>
        </div>
        <button class="moreBtn" v-if="state.replyLength > state.limitNum" @click="showMoreList">
          더보기
        </button>
      </div>
    </div>
  </section>


  <!-- Mobile -->
  <section class="visible-sm-down m_main">
    <div class="m_main_box">
      <div class="m_detail_box">
        <div class="m_detail_content_box">
          <div class="m_content_box">
            <div class="m_content_box__title">{{state.article.title}}</div>
            <div class="m_content_box__contents">{{state.article.contents}}</div>
          </div>  
          <div class="m_created_at">
            created_at({{state.createdAt}})
          </div>
        </div>
        <div class="m_middle_box">
          <div class="m_countBox">
            <div class="m_countBox__title">답변</div>
            <div class="m_countBox__count">{{state.replyLength}}</div>
          </div>
        </div>
        <div class="m_comment_box" v-for="reply in state.replies.slice(0, state.limitNum)" :key="reply.id">
          <div class="m_header_box">
            <div class="m_reply_user_name">{{reply.user.name}}</div>
          </div>
          <div class="m_content_box">
            <div class="m_content_box__contents">{{reply.contents}}</div>
          </div>
          <div class="m_created_at">
            created_at({{reply.created_at.split('T')[0]}})
          </div>
        </div>
        <button class="moreBtn" v-if="state.replyLength > state.limitNum" @click="showMoreList">
          더보기
        </button>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, reactive, getCurrentInstance, onMounted } from 'vue'
import { MainApi } from '../apis'
import { Article, Reply } from '../types'
import { useRoute } from 'vue-router';
import * as util from '../utils';

export default defineComponent({
  name: 'View',

  props: {},

  setup(){
    const mainApi:MainApi = getCurrentInstance()?.appContext.config.globalProperties.$mainApi;
    const route = useRoute();

    const state = reactive({
      article: {} as Article,
      createdAt:'2021-01-01',
      replies: [] as Reply[],
      replyLength: 0,
      limitNum: 10
    })

    // id 파라미터 값 가져오기
    let id = 0
    if ( route.query.id != null ) {
      id = util.toIntOrNull(route.query.id);
    }

    // 디테일정보 가져오기
    async function loadArticle(id: number){
      const axRes = await mainApi.article_view(id)
        state.article = axRes.data.data;
        state.createdAt = state.article.created_at.split('T')[0];
        state.replyLength = state.article.reply.length;
        state.replies = state.article.reply;
    }

    onMounted(() => {
      loadArticle(id);
    });
    
    // 더보기
    function showMoreList(){
      state.limitNum = state.limitNum + 10;
    }


    return{
      state,
      showMoreList
    }
  }
})
</script>

<style lang="scss" scoped>
  /* PC */
  .main{
    height: 100%;
    width: 1920px;
  }
  .main_box{
    margin: auto;
    height: 100%;
    width: 1140px;
    padding-top: 50px;
    padding-bottom: 50px;
  }


  .detail_box{
    height: 100%;
    width: 100%;
  }
  .detail_content_box{
    height: 169px;
    width: 1078px;
    background: var(--unnamed-color-ffffff) 0% 0% no-repeat padding-box;
    border: 1px solid var(--unnamed-color-00c854);
    border-radius: 5px;
    opacity: 1;
    padding: 20px 30px 20px 30px;
  }
  .content_box{
    width: 100%;
    text-align: center;
  }


  .middle_box{
    margin-top: 31px;
    margin-bottom: -20px;
  }  
  .countBox{
    display: flex;
    align-items: center;
    color: var(--unnamed-color-495057);
    text-align: left;
    font: normal normal normal 16px/25px SpoqaHanSans;
    letter-spacing: 0px;
    opacity: 1;
  }
  .countBox > .countBox__title{
    color: #495057;
    margin-right: 8px;
  }
  .countBox > .countBox__count{
    color: #00C854;
  }


  .comment_box{
    height: 159px;
    width: 1078px;
    background: var(--unnamed-color-ffffff) 0% 0% no-repeat padding-box;
    border: 1px solid #E1E4E7;
    border-radius: 5px;
    opacity: 1;
    padding: 21px 31px 21px 30px;
    margin-top: 30px;
  }
  .comment_box > .header_box{
    height: 24px;
    padding-bottom: 11px;
    margin-bottom: 15px;
    border-bottom:1px solid #E1E4E7;
  }
  .reply_user_name{
    text-align: left;
    font: normal normal normal 16px/25px SpoqaHanSans;
    letter-spacing: 0px;
    color: #7E848A;
    opacity: 1;
  }


  .created_at{
    height: 19px;
    text-align: left;
    font: normal normal normal 13px/25px SpoqaHanSans;
    letter-spacing: 0px;
    color: #ADB5BD;
    opacity: 1;
  }


 .content_box__title{
    height: 55px;
    width: 100%;
    text-align: left;
    text-overflow: ellipsis; 
    white-space: normal; 
    overflow: hidden;
    word-break:break-all;
    font: normal normal bold 18px/28px SpoqaHanSans;
    letter-spacing: 0px;
    color: #282C30;
    opacity: 1;
    line-height: 28px; 
    display: -webkit-box; 
    -webkit-line-clamp: 2; 
    -webkit-box-orient: vertical;
  }
  .content_box__contents{
    height: 74px;
    width: 100%;
    white-space: normal; 
    text-align: left;
    text-overflow: ellipsis; 
    overflow: hidden;
    word-break:break-all;
    font: normal normal normal 16px/25px SpoqaHanSans;
    letter-spacing: 0px;
    color: #495057;
    opacity: 1;
    margin-top: 6px;
    margin-bottom: 15px;
    line-height: 25px; 
    display: -webkit-box; 
    -webkit-line-clamp: 3; 
    -webkit-box-orient: vertical;
  }



  /* Mobile */
  .backBtn{
    text-align: left;
    font: normal normal bold 22px/25px SpoqaHanSans;
    letter-spacing: 0px;
    color: #282C30;
    opacity: 1;
  }
  .m_main{
    height: 100%;
    min-width: 375px;
  }
  .m_main_box{
    height: 100%;
    width: 100%;
    padding-bottom: 20px;
  }


  .m_detail_box{
    height: 100%;
    min-width: 375px;
    padding: 0px 15px 0px 15px;
    margin: 20px 0px;
  }
  .m_detail_content_box{
    height: 205px;
    width: 100%;
    background: var(--unnamed-color-ffffff) 0% 0% no-repeat padding-box;
    border-top: 1px solid var(--unnamed-color-00c854);
    border-bottom: 1px solid var(--unnamed-color-00c854);
    opacity: 1;
    padding: 20px 0px 20px 0px;    
  }
  .m_content_box{
    width: 100%;
    text-align: center;
  }


  .m_middle_box{
    margin-top: 31px;
    margin-bottom: -20px;
  }  
  .m_countBox{
    display: flex;
    align-items: center;
    color: var(--unnamed-color-495057);
    text-align: left;
    font: normal normal normal 16px/25px SpoqaHanSans;
    letter-spacing: 0px;
    opacity: 1;
  }
  .m_countBox > .m_countBox__title{
    color: #495057;
    margin-right: 8px;
  }
  .m_countBox > .m_countBox__count{
    color: #00C854;
  }


  .m_comment_box{
    height: 159px;
    min-width: 375px;
    background: var(--unnamed-color-ffffff) 0% 0% no-repeat padding-box;
    border-top: 1px solid #E1E4E7;
    border-bottom: 1px solid #E1E4E7;
    opacity: 1;
    padding: 21px 0px 21px 0px;
    margin-top: 30px;
  }
  .m_comment_box > .m_header_box{
    height: 24px;
    padding-bottom: 11px;
    margin-bottom: 16px;
    border-bottom:1px solid #E1E4E7;
  }
  .m_reply_user_name{
    text-align: left;
    font: normal normal normal 16px/25px SpoqaHanSans;
    letter-spacing: 0px;
    color: #7E848A;
    opacity: 1;
  }


  .m_created_at{
    height: 19px;
    text-align: left;
    font: normal normal normal 13px/25px SpoqaHanSans;
    letter-spacing: 0px;
    color: #ADB5BD;
    opacity: 1;
  }


  .m_content_box__title{
    height: 83px;
    width: 100%;
    text-align: left;
    text-overflow: ellipsis; 
    white-space: normal; 
    overflow: hidden;
    word-break:break-all;
    font: normal normal bold 18px/28px SpoqaHanSans;
    letter-spacing: 0px;
    color: #282C30;
    opacity: 1;
    line-height: 28px; 
    display: -webkit-box; 
    -webkit-line-clamp: 3; 
    -webkit-box-orient: vertical;
  }
  .m_content_box__contents{
    height: 74px;
    width: 100%;
    white-space: normal; 
    text-align: left;
    text-overflow: ellipsis; 
    overflow: hidden;
    word-break:break-all;
    font: normal normal normal 16px/25px SpoqaHanSans;
    letter-spacing: 0px;
    color: #495057;
    opacity: 1;
    margin-top: 7px;
    margin-bottom: 15px;
    line-height: 25px; 
    display: -webkit-box; 
    -webkit-line-clamp: 3; 
    -webkit-box-orient: vertical;
  }


  /* 더보기 버튼 */
  .moreBtn{
    width: 100%;
    height: 40px;
    background: var(--unnamed-color-00c854) 0% 0% no-repeat padding-box;
    color: var(--unnamed-color-ffffff);
    font: normal normal normal 16px/32px SpoqaHanSans;
    text-align: center;
    border-radius: 5px;
    margin-top: 10px;
  }
  
</style>