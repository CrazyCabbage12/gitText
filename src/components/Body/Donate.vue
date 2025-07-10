<script setup>
import {reactive, ref} from 'vue'
import img1 from "@/assets/images/DonateImg/thefrist.png"
import img2 from "@/assets/images/DonateImg/OIP-C.jpg"
import img3 from "@/assets/images/DonateImg/3.jpg"
import img4 from "@/assets/images/DonateImg/收款.jpg"
import img5 from "@/assets/images/DonateImg/支付宝.jpg"

const state = reactive({
  circleUrl1: img1,
  circleUrl2: img2,
  circleUrl3: img3,
  circleUrl4: img4,
  circleUrl5: img5,
})

const showThanksDialog = ref(false)
const selectedAmount = ref(0)
const showExtraDialog = ref(false)

const handleDonation = (amount) => {
  selectedAmount.value = amount
  showThanksDialog.value = true
  console.log(`捐赠${amount}元`)
}
</script>

<template>
  <div class="donate">
    <div class="text-header">
      <h3>请选择投喂方式(๑´ڡ`๑)</h3>
    </div>

    <div class="donation-options">
      <el-row :gutter="20">
        <!-- 三个捐赠卡片 -->
        <el-col :span="8">
          <div class="donation-box">
            <div class="cute-image">
              <el-avatar :size="100" :src="state.circleUrl1"/>
            </div>
            <div class="donation-info">
              <p>一行征雁向南飞，八只野猪入关来</p>
              <p>野花夺朱非正色，异种草莽也称王</p>
              <p>明月有情还顾我,清风不义不留郎</p>
              <p>自古胡虏无长运,不信江山不姓唐</p>
              <el-button type="primary" class="donate-btn" @click="handleDonation(1)">
                1元支持
              </el-button>
            </div>
          </div>
        </el-col>

        <el-col :span="8">
          <div class="donation-box">
            <div class="cute-image">
              <el-avatar :size="100" :src="state.circleUrl2"/>
            </div>
            <div class="donation-info">
              <p>英姿飒爽如星斗，玉树临风映画堂</p>
              <p>谈笑从容多雅量，人间难得此贤良</p>
              <p>德行兼备真君子，孝义双全世所扬</p>
              <p>千古风流今尚在，令人景仰意悠长</p>
              <el-button type="success" class="donate-btn" @click="handleDonation(3)">
                3元支持
              </el-button>
            </div>
          </div>
        </el-col>

        <el-col :span="8">
          <div class="donation-box">
            <div class="cute-image">
              <el-avatar :size="100" :src="state.circleUrl3"/>
            </div>
            <div class="donation-info">
              <p>回眸一笑百媚生，六宫粉黛无颜色</p>
              <p>芙蓉不及美人妆，水殿风来珠翠香</p>
              <p>态浓意远淑且真，肌理细腻骨肉匀</p>
              <p>云想衣裳花想容，春风拂槛露华浓</p>
              <el-button type="warning" class="donate-btn" @click="handleDonation(5)">
                5元支持
              </el-button>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>

    <!-- 感谢弹窗 -->
    <el-dialog title="你真给啊！" v-model="showThanksDialog" width="400px" center>
      <p style="text-align: center; font-size: 18px;">
        我怎么能要您的钱呢！<br/>
        您的肯定就是对我最大的支持<br/>
        谢谢！(｡♥‿♥｡)
      </p>
      <template #footer>
        <el-button type="primary" @click="showThanksDialog = false">关闭</el-button>
      </template>
    </el-dialog>

    <!-- 右下角按钮 -->
    <el-button
        class="extra-btn"
        type="danger"
        circle
        size="large"
        @click="showExtraDialog = true"
    >
      <el-icon>
        <Star/>
      </el-icon>
    </el-button>
    <div style="text-align: center">
      <el-dialog title="其实给点也行" v-model="showExtraDialog" width="800px" center>
        <p style="text-align: center; font-size: 18px;">
          愿您每天都有好心情！
        </p>

        <!-- 图片区域 -->
        <div class="image-row">
          <img
              :src="state.circleUrl4"
              alt="微信收款码"
              class="qr-image"
          />
          <img
              :src="state.circleUrl5"
              alt="支付宝收款码"
              class="qr-image"
          />
        </div>
        <!-- 按钮 -->
        <div class="dialog-footer-center">
          <el-button type="primary" @click="showExtraDialog = false">关闭</el-button>
        </div>
      </el-dialog>
    </div>
    <!-- 额外弹窗 -->

  </div>
</template>

<style scoped lang="less">
.text-header {
  text-align: center;
  margin-bottom: 30px;

  h3 {
    color: #333;
    font-size: 24px;
  }
}

.donation-options {
  padding: 0 20px;
}

.donation-box {
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  transition: all 0.3s ease;
  height: 100%;
  display: flex;
  flex-direction: column;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
  }

  .cute-image {
    text-align: center;
    padding: 20px;
    background-color: #f9f9f9;
  }

  .donation-info {
    padding: 20px;
    text-align: center;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    p {
      margin: 0 0 20px 0;
      color: #555;
      font-size: 16px;
      line-height: 1.5;
    }

    .donate-btn {
      width: 100%;
      padding: 12px;
      font-size: 16px;
      font-weight: bold;
      border-radius: 6px;
    }
  }
}

.extra-btn {
  position: fixed;
  bottom: 40px;
  right: 40px;
  z-index: 1000;
}
.image-row {
  display: flex;
  justify-content: center;
  gap: 40px; // 图片之间的间距
  margin-top: 20px;
}

.qr-image {
  width: 200px;
  height: 250px;
  object-fit: cover;
  border-radius: 10px;
}

.dialog-footer-center {
  text-align: center;
  margin-top: 30px;
}
</style>