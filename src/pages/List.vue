<template>
  <HeaderBar>[21.05.18] 최주영</HeaderBar>
  <!-- PC -->
  <section class="visible-md-up main">
    <div class="main_box">
      <div class="login_btn">
        <span>
          로그인
        </span>
      </div>
      <div class="feed_box">
        <div class="top_box">
          <div class="order_btn">
            <div class="dots">
              <input id="dot1" name="dots" type="radio" value="asc" checked v-model="orderState.checkedOrder">
              <label for="dot1">오름차순</label>
            </div>
            <div class="dots">
              <input id="dot2" name="dots" type="radio" value="desc" v-model="orderState.checkedOrder">
              <label for="dot2">내림차순</label>
            </div>
          </div>
          <button class="filter_btn" @click="isModalViewed = true">
            <span>필터</span>
          </button>
        </div>
        <div v-for="(article, index) in state.articles" :key="article.id">
          <router-link :to="'view?id=' + article.id" class="card_content_box">
            <div class="header">
              <div class="category_name">{{returnToName(article.category_id)}}</div>
              <div class="id">{{article.id}}</div>
            </div>
            <div class="info">
              <div class="user_id">{{article.user_id}}</div>
              <div class="created_at">created_at({{article.created_at.split('T')[0]}})</div>
            </div>
            <div class="content_box">
              <div class="content_box__title">{{article.title}}</div>
              <div class="content_box__contents">{{article.contents}}</div>
            </div>
          </router-link>
          <template v-if="(index+1)%3 == 0">
          <div class="sponsor_content_box">
            <div class="sponsored">sponsored</div>
            <div class="sponsor_content_box__box">
              <div class="imgBox"><img :src="'https://cdn.comento.kr/assignment/' + loadAd(index)" alt=""></div>
              <div class="content_box">
                <div class="content_box__title">{{state.ad.title}}</div>
                <div class="content_box__contents">{{state.ad.contents}}</div>
              </div>   
            </div>
          </div>
          </template>
        </div>
        <button class="moreBtn" v-if="state.total > state.limitNum" @click="showMoreList">
          더보기
        </button>
      </div>
    </div>

    <ModalView v-if="isModalViewed" @close-modal="isModalViewed = false" @save-category="saveCategory(), isModalViewed = false">
      <div class="category_checkBox">
        <div>
          <input type="checkbox" id="catOne" value="1" checked v-model="checkedState.checked">
          <label for="catOne">{{returnToName(1)}}</label>
        </div>
        <div>
          <input type="checkbox" id="catTwo" value="2" checked v-model="checkedState.checked">
          <label for="catTwo">{{returnToName(2)}}</label>
        </div>
        <div>
          <input type="checkbox" id="catThree" value="3" checked v-model="checkedState.checked">
          <label for="catThree">{{returnToName(3)}}</label>
        </div>
      </div>
    </ModalView>

  </section>


  <!-- Mobile -->
  <section class="visible-sm-down m_main">
    <div class="m_main_box">
      <div class="m_feed_box">
        <div class="m_top_box">
          <div class="m_order_btn">
            <div class="m_dots">
              <input id="m_dot1" name="m_dots" type="radio" value="asc" checked v-model="orderState.checkedOrder">
              <label for="m_dot1">오름차순</label>
            </div>
            <div class="m_dots">
              <input id="m_dot2" name="m_dots" type="radio" value="desc" v-model="orderState.checkedOrder">
              <label for="m_dot2">내림차순</label>
            </div>
          </div>
          <button class="m_filter_btn" @click="isModalViewed = true">
            <span>필터</span>
          </button>
        </div>
        <div v-for="(article, index) in state.articles" :key="article.id">
          <router-link :to="'view?id=' + article.id" class="m_card_content_box" >
            <div class="m_header">
              <div class="m_category_name">{{returnToName(article.category_id)}}</div>
              <div class="m_id">{{article.id}}</div>
            </div>
            <div class="m_info">
              <div class="m_user_id">{{article.user_id}}</div>
            </div>
            <div class="m_content_box">
              <div class="m_content_box__title">{{article.title}}</div>
              <div class="m_content_box__contents">{{article.contents}}</div>
            </div>
          </router-link>
          <template v-if="(index+1)%3 == 0">
          <div class="m_sponsor_content_box">
            <div class="m_sponsored">sponsored</div>
            <div class="m_sponsor_content_box__box">
              <div class="m_imgBox"><img :src="'https://cdn.comento.kr/assignment/' + loadAd(index)" alt=""></div>
              <div class="m_content_box">
                <div class="m_content_box__title">{{state.ad.title}}</div>
                <div class="m_content_box__contents">{{state.ad.contents}}</div>
              </div>   
            </div>
          </div>
          </template>
        </div>
        <button class="moreBtn" v-if="state.total > state.limitNum" @click="showMoreList">
          더보기
        </button> 
      </div>
    </div>

    <ModalView v-if="isModalViewed" @close-modal="isModalViewed = false" @save-category="saveCategory(), isModalViewed = false">
      <div class="category_checkBox">
        <div>
          <input type="checkbox" id="catOne" value="1" checked v-model="checkedState.checked">
          <label for="catOne">{{returnToName(1)}}</label>
        </div>
        <div>
          <input type="checkbox" id="catTwo" value="2" checked v-model="checkedState.checked">
          <label for="catTwo">{{returnToName(2)}}</label>
        </div>
        <div>
          <input type="checkbox" id="catThree" value="3" checked v-model="checkedState.checked">
          <label for="catThree">{{returnToName(3)}}</label>
        </div>
      </div>
    </ModalView>

  </section>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, getCurrentInstance, onMounted, watch } from 'vue'
import { MainApi } from '../apis'
import { Article, Category, Ad } from '../types'
import ModalView from "../components/ModalView.vue";

const useOrderState = () => {
  return reactive({
    checkedOrder: 'asc',
  })
}

const useCheckBoxState = () => {
  return reactive({
    checked: [1,2,3],
  })
}

export default defineComponent({
  name: 'List',

  props: {
    isModalViewed: {
      type: Boolean,
      default: false
    },
  },

  components: { 
    ModalView 
  },

  setup(props){
    const mainApi:MainApi = getCurrentInstance()?.appContext.config.globalProperties.$mainApi;
    const orderState = useOrderState();
    const checkedState = useCheckBoxState();

    const state = reactive({
      articles: [] as Article[],
      categories: [] as Category[],
      ads: [] as Ad[],
      ad: {} as Ad,
      total: 0,
      limitNum: 10,
    })

    // 카테고리정보 가져오기
    async function loadCategories(){
      const axRes = await mainApi.category_list()
        state.categories = axRes.data.category;
    }

    // 카테고리 파라미터 값 생성
    let baseCategory = '&category[]=';
    let category = '';

    for(let i = 0; i < checkedState.checked.length; i++){
      category += baseCategory + checkedState.checked[i]
    }

    // 게시물리스트 가져오기
    async function loadArticles(ord: string, category: string, limit: number){
      const axRes = await mainApi.article_list(ord, category, limit)
      const axRes2 = await mainApi.ads_list(limit)
      
        state.articles = axRes.data.data;
        state.total = axRes.data.total;
        state.ads = axRes2.data.data;
    }

    // 광고정보
    function loadAd(articleIndex: number){
      state.ad = state.ads[articleIndex]
      return state.ad.img
    }
    
    onMounted(() => {
      loadCategories();
      loadArticles(orderState.checkedOrder, category, state.limitNum);
    });

    watch(() => orderState.checkedOrder, () => {
      loadArticles(orderState.checkedOrder, category, state.limitNum);
    })

    // 팝업
    const isModalViewed = ref(false);

    watch(() => props.isModalViewed, show => {
        isModalViewed.value = show;
      },
    );

    // 카테고리 체크 정보 저장
    function saveCategory(){
      category = '';
      for(let i = 0; i < checkedState.checked.length; i++){
        category += baseCategory + checkedState.checked[i]
      }
      loadArticles(orderState.checkedOrder, category, state.limitNum);
    }

    // 더보기
    function showMoreList(){
      state.limitNum = state.limitNum + 10;
      loadArticles(orderState.checkedOrder, category, state.limitNum);
    }

    // 카테고리 이름 가져오기
    function returnToName(category_id: number) {
      let categoryName = ''; 
      
      categoryName = state.categories[category_id-1].name;
      
      return categoryName;
    }

    return{
      state,
      orderState,
      isModalViewed,
      checkedState,
      saveCategory,
      showMoreList,
      returnToName,
      loadAd
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
    padding: 120px 390px;
    height: 100%;
    display: flex;
  }


  .login_btn{
    display: flex;
    justify-content: center;
    align-items: center;
    top: 120px;
    left: 390px;
    width: 235px;
    height: 60px;
    text-align: center;
    background: var(--unnamed-color-00c854) 0% 0% no-repeat padding-box;
    background: #00C854 0% 0% no-repeat padding-box;
    border-radius: 5px;
    opacity: 1;
  }
  .login_btn > span{    
    color: var(--unnamed-color-ffffff);
    font: normal normal bold 22px/25px SpoqaHanSans;
    letter-spacing: 0px;
    color: #FFFFFF;
    opacity: 1;
  }


  .feed_box{
    height: 100%;
    width: 865px;
    margin-left: 40px;
  }
  .top_box{
    display: flex;
    justify-content: space-between;
    width: 100%;
  }
  .order_btn{
    display: flex;
  }
  .order_btn > .dots{
    display: flex;
    align-items: center;
    margin-right: 8px;
    
  }
  input[type='radio'], input[type='radio']:checked{
    width: 6px;
    height: 6px;
    background: #E1E4E7 0% 0% no-repeat padding-box;
    border-radius: 100%;
    opacity: 1;
    margin-right: 5px;
    appearance: none;
  }
  input[type='radio']:checked{
    background: var(--unnamed-color-00c854) 0% 0% no-repeat padding-box;
  }
  label{
    color: #ADB5BD;
    font: normal normal normal 13px/25px SpoqaHanSans;
    letter-spacing: 0px;
    opacity: 1;
    cursor: pointer;
  }
  input[type='radio']:checked + label{
    color: var(--unnamed-color-495057);
  }
  .top_box > .filter_btn{
    width: 48px;
    height: 24px;
    background: var(--unnamed-color-ffffff) 0% 0% no-repeat padding-box;
    background: #FFFFFF 0% 0% no-repeat padding-box;
    border: 1px solid #E1E4E7;
    border-radius: 3px;
    opacity: 1;
    text-align: center;
  }
  .filter_btn > span{
    width: 24px;
    height: 19px;
    text-align: left;
    font: normal normal normal 13px/25px SpoqaHanSans;
    letter-spacing: 0px;
    color: #ADB5BD;
    opacity: 1;
  }

  .card_content_box{
    width: 803px;
    height: 179px;
    display: block;
    background: var(--unnamed-color-ffffff) 0% 0% no-repeat padding-box;
    background: #FFFFFF 0% 0% no-repeat padding-box;
    border: 1px solid #E1E4E7;
    border-radius: 5px;
    opacity: 1;
    padding: 20px 30px 0px 30px;
    margin-top: 14px;
  }
  .card_content_box > .header{
    display: flex;
    justify-content: space-between;
    padding-bottom: 11px;
    margin-bottom: 15px;
    border-bottom:1px solid #E1E4E7;
  }
  .header > *{
    text-align: left;
    font: normal normal normal 13px/25px SpoqaHanSans;
    letter-spacing: 0px;
    color: #7E848A;
    opacity: 1;
  }
  .card_content_box > .info{
    display: flex;
  }
  .info > div{
    color: var(--unnamed-color-495057);
    text-align: left;
    font: normal normal normal 13px/25px SpoqaHanSans;
    letter-spacing: 0px;
    color: #495057;
    opacity: 1;
  }
  .info > div:first-child{
    position: relative;
    color: #00C854;
    margin-right: 15px;
  }
  .info > div:first-child::after{
    position: absolute;
    content: "";
    height: 15px;
    width: 1px;
    background-color: #E1E4E7;
    right: -8px;
    bottom: 5px;
  }

  .content_box__title{
    height: 27px;
    text-align: left;
    text-overflow: ellipsis; 
    white-space: nowrap; 
    overflow: hidden;
    word-break:break-all;
    font: normal normal bold 18px/28px SpoqaHanSans;
    letter-spacing: 0px;
    line-height: 28px;
    color: #282C30;
    opacity: 1;
    margin-top: 17px;
  }
  .content_box__contents{
    height: 24px;
    text-align: left;
    text-overflow: ellipsis; 
    white-space: nowrap; 
    overflow: hidden;
    word-break:break-all;
    font: normal normal normal 16px/25px SpoqaHanSans;
    letter-spacing: 0px;
    line-height: 25px;
    color: #495057;
    opacity: 1;
    margin-top: 6px;
  }


  .sponsor_content_box{
    width: 803px;
    height: 255px;
    background: var(--unnamed-color-ffffff) 0% 0% no-repeat padding-box;
    background: #FFFFFF 0% 0% no-repeat padding-box;
    border: 1px solid #E1E4E7;
    border-radius: 5px;
    opacity: 1;
    padding: 20px 30px 0px 30px;
    margin-top: 30px;
    margin-bottom: 30px;
  }
  .sponsored{
    text-align: left;
    font: normal normal normal 13px/25px SpoqaHanSans;
    letter-spacing: 0px;
    color: #ADB5BD;
    opacity: 1;
  }
  .sponsor_content_box__box{
    display: flex;
    align-items: center;
    margin-top: 16.5px;
  }
  .sponsor_content_box__box > .imgBox{
    width: 310px;
    height: 179px;
    border: 1px solid #E1E4E7;
    opacity: 1;
    background-color: gray;
    margin-right: 29.5px;
    overflow: hidden;
    object-fit: cover;
  }
  .sponsor_content_box__box > .imgBox > img{
    width: 100%;
  }
  .sponsor_content_box__box .content_box__title{
    margin-top: 0px;
    width: 463px;
    height: 55px;
    white-space: normal; 
    line-height: 1.5; 
    display: -webkit-box; 
    -webkit-line-clamp: 2; 
    -webkit-box-orient: vertical;
  }
  .sponsor_content_box__box .content_box__contents{
    width: 465px;
    height: 99px;
    white-space: normal; 
    line-height: 1.5; 
    display: -webkit-box; 
    -webkit-line-clamp: 4; 
    -webkit-box-orient: vertical;
  }



  /* Mobile */
  .m_main{
    height: 100%;
    width: 100%;
    background-color: var(--unnamed-color-f4f5f7);
  }
  .m_main_box{
    height: 100%;
    width: 100%;
    display: flex;
    padding-bottom: 20px;
  }
  

  .m_feed_box{
    height: 100%;
    width: 100%;
  }
  .m_top_box{
    display: flex;
    justify-content: space-between;
    background-color: #FFFFFF;
    border-bottom: 1px solid #E1E4E7;
    align-items: center;
    height: 44px;
    min-width: 375px;
  }
  .m_order_btn{
    display: flex;
    margin-left: 15px;
  }
  .m_order_btn > .m_dots{
    display: flex;
    align-items: center;
    margin-right: 8px;
  }
  .m_top_box > .m_filter_btn{
    width: 48px;
    height: 24px;
    background: var(--unnamed-color-ffffff) 0% 0% no-repeat padding-box;
    background: #FFFFFF 0% 0% no-repeat padding-box;
    border: 1px solid #E1E4E7;
    border-radius: 3px;
    opacity: 1;
    text-align: center;
    margin-right: 15px;
  }
  .m_filter_btn > span{
    width: 24px;
    height: 19px;
    text-align: left;
    font: normal normal normal 13px/25px SpoqaHanSans;
    letter-spacing: 0px;
    color: #ADB5BD;
    opacity: 1;
  }

  .m_card_content_box{
    min-width: 375px;
    height: 179px;
    display: block;
    background: var(--unnamed-color-ffffff) 0% 0% no-repeat padding-box;
    background: #FFFFFF 0% 0% no-repeat padding-box;
    box-shadow: 0px 5px 10px #0000000D;
    opacity: 1;
    padding-top: 21px;
    margin-bottom: 10px;
  }
  .m_card_content_box > .m_header{
    display: flex;
    justify-content: space-between;
    padding: 0px 15px 7px 15px;
    margin-bottom: 15px;
    border-bottom:1px solid #E1E4E7;
  }
  .m_header > *{
    text-align: left;
    font: normal normal normal 13px/25px SpoqaHanSans;
    letter-spacing: 0px;
    color: #7E848A;
    opacity: 1;
  }
  .m_card_content_box > .m_info{
    display: flex;
    padding: 0px 15px 0px 15px;
  }
  .m_info > div{
    color: var(--unnamed-color-495057);
    text-align: left;
    font: normal normal normal 13px/25px SpoqaHanSans;
    letter-spacing: 0px;
    color: #00C854;
    opacity: 1;
  }

  .m_content_box__title{
    height: 27px;
    text-align: left;
    text-overflow: ellipsis; 
    white-space: nowrap; 
    overflow: hidden;
    word-break:break-all;
    font: normal normal bold 18px/28px SpoqaHanSans;
    letter-spacing: 0px;
    color: #282C30;
    opacity: 1;
    margin-top: 17px;
    padding: 0px 15px 0px 15px;
  }
  .m_content_box__contents{
    height: 24px;
    text-align: left;
    text-overflow: ellipsis; 
    white-space: nowrap; 
    overflow: hidden;
    word-break:break-all;
    font: normal normal normal 16px/25px SpoqaHanSans;
    letter-spacing: 0px;
    color: #495057;
    opacity: 1;
    margin-top: 6px;
    padding: 0px 15px 0px 15px;
  }


  .m_sponsor_content_box{
    min-width: 375px;
    height: 381px;
    background: var(--unnamed-color-ffffff) 0% 0% no-repeat padding-box;
    background: #FFFFFF 0% 0% no-repeat padding-box;
    box-shadow: 0px 5px 10px #0000000D;
    opacity: 1;
    padding-top: 20px;
    margin-top: 10px;
    margin-bottom: 10px;
  }
  .m_sponsored{
    text-align: left;
    font: normal normal normal 13px/25px SpoqaHanSans;
    letter-spacing: 0px;
    color: #ADB5BD;
    opacity: 1;
    padding: 0px 15px 0px 15px;
  }
  .m_sponsor_content_box__box{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 16.5px;
    padding: 0px 15px 0px 15px;
  }
  .m_sponsor_content_box__box > .m_imgBox{
    width: 100%;
    height: 179px;
    border: 1px solid #E1E4E7;
    opacity: 1;
    background-color: gray;
    overflow: hidden;
    object-fit: cover;
  }
  .m_sponsor_content_box__box > .m_imgBox > img{
    width: 100%;
  }
  .m_sponsor_content_box__box .m_content_box__title{
    min-width: 341px;
    height: 55px;
    white-space: normal; 
    line-height: 1.5; 
    display: -webkit-box; 
    -webkit-line-clamp: 2; 
    -webkit-box-orient: vertical;
    margin-top: 16.5px;
    padding: 0px 0px 0px 0px;
  }
  .m_sponsor_content_box__box .m_content_box__contents{
    min-width: 341px;
    height: 49px;
    white-space: normal; 
    line-height: 1.5; 
    display: -webkit-box; 
    -webkit-line-clamp: 2; 
    -webkit-box-orient: vertical;
    margin-top: 6px;
    padding: 0px 0px 0px 0px;
  }


  /* 팝업 */
  .category_checkBox{
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-bottom: 30px;
  }
  .category_checkBox > div{
    display: flex;
    margin-top: 13px;
  }
  .category_checkBox > div > input[type='checkbox']{
    width: 20px;
    height: 20px;
    background: var(--unnamed-color-ffffff) 0% 0% no-repeat padding-box;
    border: 1px solid #E1E4E7;
    opacity: 1;
    cursor: pointer;
  }
  .category_checkBox > div > input[type='checkbox']:checked{
    appearance: auto;
  }
  .category_checkBox > div > label{
    color: var(--unnamed-color-495057);
    text-align: left;
    font: normal normal normal 16px/32px SpoqaHanSans;
    letter-spacing: 0px;
    opacity: 1;
    margin-left: 5px;
    cursor: pointer;
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