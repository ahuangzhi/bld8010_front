<template>
  <el-container id="device_manage" v-loading="loading">
    <el-header class="device_search">
      <el-row>
        <el-col :span="24">
          <div class="grid-content bg-purple-dark">
            <el-row :gutter="20">
              <el-col :span="10">
                <div><el-input class="search_input" placeholder="请输入设备信息" v-model="search.search" clearable></el-input></div>
              </el-col>
              <el-col :span="1.5"><el-button class="spacing20" type="primary" @click="search_device" icon="el-icon-search" round>设备搜索</el-button></el-col>
              <el-col :span="1.5" v-if="!isCustomer"><el-button @click="get_types(true)" class="spacing20" icon="el-icon-plus" round>添加设备</el-button></el-col>
            </el-row>
          </div>
        </el-col>
      </el-row>
    </el-header>
    <el-main>
      <!--设备列表-->
      <el-table :data="table_data" style="width: 100%">
        <el-table-column label="设备名称" prop="name"></el-table-column>
        <el-table-column label="拥有人" prop="cName"></el-table-column>
        <el-table-column label="设备ID" prop="id.id"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button class="round_button" @click="info_device(scope.row)" title="详细信息">
              <svg class="bld_icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="200" height="200">
                <path
                  d="M828.5 886.3H238.4c-9.9 0-18-8.1-18-18v-4c0-9.9 8.1-18 18-18h590.1c9.9 0 18 8.1 18 18v4c0 9.9-8.1 18-18 18zM828.5 684.6H238.4c-9.9 0-18-8.1-18-18v-4c0-9.9 8.1-18 18-18h590.1c9.9 0 18 8.1 18 18v4c0 9.9-8.1 18-18 18zM409 449.5H230.2c-17.6 0-32-14.4-32-32V238.7c0-17.6 14.4-32 32-32H409c17.6 0 32 14.4 32 32v178.8c0 17.6-14.4 32-32 32z m-170.8-40H401V246.7H238.2v162.8zM822.4 437.5H552.9c-11 0-20-9-20-20s9-20 20-20h269.5c11 0 20 9 20 20s-9 20-20 20zM822.4 269.5H552.9c-11 0-20-9-20-20s9-20 20-20h269.5c11 0 20 9 20 20s-9 20-20 20z"
                  fill="#888888"
                ></path>
                <path
                  d="M884.4 1024H182.5c-46.3 0-83.9-37.7-83.9-83.9V91.9C98.6 45.7 136.3 8 182.5 8h701.9c46.3 0 83.9 37.7 83.9 83.9V940c0 46.3-37.7 84-83.9 84zM182.5 48c-24.2 0-43.9 19.7-43.9 43.9V940c0 24.2 19.7 43.9 43.9 43.9h701.9c24.2 0 43.9-19.7 43.9-43.9V91.9c0-24.2-19.7-43.9-43.9-43.9H182.5z"
                  fill="#888888"
                ></path>
              </svg>
            </el-button>
            <template v-if="!isCustomer">
              <el-button class="round_button" @click="public_device(scope.row.id.id)" v-if="scope.row.customerId.id === '13814000-1dd2-11b2-8080-808080808080'" title="公开设备">
                <svg class="bld_icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="200" height="200">
                  <path
                    d="M512.021333 1024c-201.557333 0-365.525333-164.010667-365.525333-365.589333 0-201.514667 163.968-365.461333 365.525333-365.461334 201.514667 0 365.482667 163.946667 365.482667 365.461334 0 201.6-163.968 365.589333-365.482667 365.589333z m0-688.384c-178.026667 0-322.858667 144.810667-322.858666 322.794667C189.162667 836.48 333.994667 981.333333 512.021333 981.333333c178.005333 0 322.816-144.853333 322.816-322.922666 0-177.984-144.810667-322.794667-322.816-322.794667z"
                  ></path>
                  <path
                    d="M306.965333 397.632a21.333333 21.333333 0 0 1-21.333333-21.333333V203.328C285.632 91.221333 380.885333 0 497.941333 0h28.053334c117.098667 0 212.373333 91.221333 212.373333 203.328a21.333333 21.333333 0 1 1-42.666667 0C695.701333 114.730667 619.584 42.666667 525.994667 42.666667h-28.053334c-93.546667 0-169.642667 72.064-169.642666 160.661333v172.970667a21.333333 21.333333 0 0 1-21.333334 21.333333zM575.296 596.714667a63.317333 63.317333 0 0 0-126.592 0c0 28.373333 18.752 51.370667 44.245333 59.52v127.317333h37.952v-127.317333c25.557333-8.149333 44.394667-31.146667 44.394667-59.52z"
                  ></path>
                </svg>
              </el-button>
              <el-button
                class="round_button"
                @click="distribution_button(scope.row.id.id)"
                v-if="scope.row.customerId.id === '13814000-1dd2-11b2-8080-808080808080'"
                title="分配设备"
              >
                <svg t="1591670629977" class="bld_icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2284" width="200" height="200">
                  <path
                    d="M512 22C241.38 22 22 241.38 22 512s219.38 490 490 490 490-219.38 490-490S782.62 22 512 22zM306.32 418.81a58.143 58.143 0 0 1 50.35-29.07h208.37l-16.26-16.25a58.13 58.13 0 0 1-15.32-56.3c5.36-20.16 21.11-35.89 41.27-41.25 20.16-5.35 41.64 0.51 56.29 15.35h0.04l115.48 115.47a57.96 57.96 0 0 1 13.33 20.75c0.06 0.16 0.11 0.31 0.17 0.47 0.15 0.42 0.31 0.85 0.45 1.28a58.145 58.145 0 0 1-4.73 47.7c-10.39 17.98-29.58 29.07-50.35 29.07H356.67c-20.77 0-39.96-11.09-50.35-29.07a58.138 58.138 0 0 1 0-58.15z m449.45 232.51c-10.39 17.98-29.58 29.07-50.35 29.07H497.01l16.21 16.21a58.145 58.145 0 0 1 15.34 56.29 58.122 58.122 0 0 1-41.24 41.26 58.13 58.13 0 0 1-56.3-15.32L315.55 663.37a58.12 58.12 0 0 1-15.35-56.29 58.118 58.118 0 0 1 41.25-41.26c6.7-1.78 13.56-2.32 20.25-1.71h343.72c20.77 0 39.96 11.09 50.35 29.07a58.12 58.12 0 0 1 0 58.14z"
                    p-id="2285"
                  ></path>
                </svg>
              </el-button>
              <el-button class="round_button" @click="del_distribution(scope.row.id)" v-if="scope.row.customerId.id !== '13814000-1dd2-11b2-8080-808080808080'" title="取消分配">
                <svg t="1591671043957" class="bld_icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2689" width="200" height="200">
                  <path d="M903.68 720.896m-20.48 0a20.48 20.48 0 1 0 40.96 0 20.48 20.48 0 1 0-40.96 0Z" fill="#231815" p-id="2690"></path>
                  <path
                    d="M903.68 774.656c-11.264 0-20.48 9.216-20.48 20.48v61.44c0 16.896-13.824 30.72-30.72 30.72h-680.96c-16.896 0-30.72-13.824-30.72-30.72V246.784c0-16.896 13.824-30.72 30.72-30.72h105.472v34.304c0 22.528 18.432 40.96 40.96 40.96h388.096c22.528 0 40.96-18.432 40.96-40.96v-34.304h105.472c16.896 0 30.72 13.824 30.72 30.72v397.824c0 11.264 9.216 20.48 20.48 20.48s20.48-9.216 20.48-20.48V246.784c0-39.424-32.256-71.68-71.68-71.68h-105.472v-38.912c0-22.528-18.432-40.96-40.96-40.96H317.952c-22.528 0-40.96 18.432-40.96 40.96v38.912H171.52c-39.424 0-71.68 32.256-71.68 71.68v609.792c0 39.424 32.256 71.68 71.68 71.68h680.96c39.424 0 71.68-32.256 71.68-71.68v-61.44c0-11.264-9.216-20.48-20.48-20.48zM317.952 136.192h388.096V250.88H317.952V136.192z"
                    fill="#231815"
                    p-id="2691"
                  ></path>
                  <path
                    d="M705.024 398.336c-8.192-8.192-20.992-8.192-29.184 0l-163.84 163.84-164.352-163.84c-8.192-8.192-20.992-8.192-29.184 0-8.192 8.192-8.192 20.992 0 29.184l164.352 164.352-164.352 164.352c-8.192 8.192-8.192 20.992 0 29.184 4.096 4.096 9.216 6.144 14.336 6.144s10.24-2.048 14.336-6.144l164.352-164.352 164.352 164.352c4.096 4.096 9.216 6.144 14.336 6.144s10.24-2.048 14.336-6.144c8.192-8.192 8.192-20.992 0-29.184l-164.352-164.352 164.352-164.352c8.192-8.192 8.192-21.504 0.512-29.184z"
                    fill="#231815"
                    p-id="2692"
                  ></path>
                </svg>
              </el-button>
              <el-button class="round_button" slot="reference" @click="del_device(scope.row.id)" title="删除设备">
                <svg class="bld_icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2330" width="200" height="200">
                  <path
                    d="M967.111 227.556H739.556V56.889H284.444v170.667H56.89v56.888h113.778v682.667h682.666V284.444h113.778v-56.888zM341.333 113.778h341.334v113.778H341.333V113.778z m455.111 796.444H227.556V284.444h568.888v625.778z"
                    fill="#73777A"
                    p-id="2331"
                  ></path>
                  <path d="M398.222 341.333h56.89v512h-56.89z m170.667 0h56.889v512h-56.89z" fill="#73777A"></path>
                </svg>
              </el-button>
            </template>
          </template>
        </el-table-column>
      </el-table>
    </el-main>

    <!--添加设备-->
    <el-drawer size="70%" title="添加新设备" custom-class="drawer_class" :visible.sync="add_device_drawer" :direction="direction">
      <el-form status-icon ref="add_device_data" :model="add_device_data" :rules="add_device_rules" label-width="80px" class="device_add_from">
        <el-form-item label="名称" prop="name"><el-input v-model="add_device_data.name"></el-input></el-form-item>
        <el-form-item label="设备类型" prop="type">
          <el-select filterable allow-create v-model="add_device_data.type" placeholder="请选择设备类型">
            <el-option v-for="item in device_types" :label="item.type" :value="item.type"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="标签"><el-input v-model="add_device_data.label"></el-input></el-form-item>
        <el-form-item label="说明"><el-input v-model="add_device_data.description"></el-input></el-form-item>
        <el-form-item label="是否是网关"><el-switch v-model="add_device_data.gateway"></el-switch></el-form-item>
        <el-form-item>
          <el-button type="primary" @click="add_device">立即创建</el-button>
          <el-button @click="add_device_drawer = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-drawer>

    <!--详细信息-->
    <el-drawer :with-header="false" custom-class="drawer_class" :direction="direction" :visible.sync="device_info_drawer" @close="info_close" size="70%">
      <el-button class="close_button" @click="device_info_drawer = false" icon="el-icon-close" title="关闭"></el-button>
      <el-tabs v-model="activeName" @tab-click="table_switch" class="device_tabs">
        <el-tab-pane label="详情" name="first">
          <div class="device_show_list">
            <div v-if="!update_mode">
              <template v-for="data1 in show_table_data">
                <DataShowInput :data1="data1"></DataShowInput>
              </template>
              <el-button class="show_button update_button" @click="get_types(false)" v-if="!isCustomer">修改信息</el-button>
            </div>
            <el-form status-icon ref="update_data" :model="update_data" :rules="add_device_rules" label-width="80px" v-if="update_mode">
              <el-form-item label="名称" prop="name"><el-input v-model="update_data.name"></el-input></el-form-item>
              <el-form-item label="设备类型" prop="type">
                <el-select filterable allow-create v-model="update_data.type" placeholder="请选择设备类型">
                  <el-option v-for="item in device_types" :label="item.type" :value="item.type"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="标签"><el-input v-model="update_data.label"></el-input></el-form-item>
              <el-form-item label="说明"><el-input v-model="update_data.additionalInfo.description"></el-input></el-form-item>
              <el-form-item label="是否是网关"><el-switch v-model="update_data.additionalInfo.gateway"></el-switch></el-form-item>
              <el-form-item><el-button class="show_button" @click="update_info">确认修改</el-button></el-form-item>
              <el-form-item><el-button class="show_button" type="primary" @click="update_mode = false">取消修改</el-button></el-form-item>
            </el-form>
          </div>
        </el-tab-pane>
        <el-tab-pane label="属性" name="second" style="margin: 0 .5rem">
          <el-container>
            <el-header>
              <el-row>
                <el-col :span="24">
                  <div class="grid-content bg-purple-dark">
                    <el-row :gutter="20">
                      <el-col :span="5">
                        <el-select v-model="attribute_type" @change="get_attributes" placeholder="请选择">
                          <el-option v-for="item in attribute_types" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                      </el-col>
                      <el-col :span="10"><el-input class="search_input" v-model="attribute_search" placeholder="请输入搜索信息" clearable></el-input></el-col>
                      <el-col :span="1.5"><el-button @click="get_attributes" class="spacing20" type="primary" icon="el-icon-search" round>搜索</el-button></el-col>
                      <el-col :span="1.5"><el-button @click="re_attributes" class="spacing20" icon="el-icon-refresh-right" round>刷新</el-button></el-col>
                      <el-col :span="1.5" v-if="attribute_type === 'SERVER_SCOPE' || attribute_type === 'SHARED_SCOPE'">
                        <el-button @click="add_attribute_button" class="spacing20" icon="el-icon-plus" round>添加</el-button>
                      </el-col>
                    </el-row>
                  </div>
                </el-col>
              </el-row>
            </el-header>
            <el-main>
              <el-table ref="attributes_table" :data="attributes" tooltip-effect="dark" style="width: 100%" @selection-change="selection_change">
                <el-table-column type="selection" width="55px"></el-table-column>
                <el-table-column prop="lastUpdateTs" label="时间" :formatter="lastUpdateTsdataformat"></el-table-column>
                <el-table-column prop="key" label="名称"></el-table-column>
                <el-table-column prop="value" label="数值"></el-table-column>
                <el-table-column align="left" label="操作">
                  <template slot-scope="scope" v-if="!isCustomer">
                    <el-button class="round_button" @click="update_attribute(scope.row)" title="修改属性" style="color: #606266;"><svg-icon icon-class="update" /></el-button>
                  </template>
                </el-table-column>
              </el-table>
              <div v-if="selection.length > 0">
                <el-button @click="c">在部件上显示</el-button>
                <el-button @click="clear_selection">取消选择</el-button>
                <el-button @click="del_attribute" type="danger">删除属性</el-button>
              </div>
            </el-main>
          </el-container>
        </el-tab-pane>
        <el-tab-pane label="遥测" name="third" style="margin: 0 .5rem">
          <el-table ref="multipleTable" :data="telemetry" tooltip-effect="dark" style="width: 100%" @selection-change="selection_change">
            <el-table-column type="selection" width="55px"></el-table-column>
            <el-table-column prop="time" label="时间"></el-table-column>
            <el-table-column prop="name" label="名称"></el-table-column>
            <el-table-column prop="v" label="数值"></el-table-column>
          </el-table>
          <div v-if="selection.length > 0">
            <el-button @click="c">在部件上显示</el-button>
            <el-button @click="clear_selection">取消选择</el-button>
          </div>

          <div style="margin: 1rem 0">
            <div style="text-align: center">上链数据查看</div>
            <el-table :data="telemetry_hash" style="width: 100%">
              <el-table-column label="txHash" min-width="125">
                <el-link @click="show_block_info(scope.row.txhash)" :underline="false" slot-scope="scope">{{ scope.row.txhash }}</el-link>
              </el-table-column>
              <!--<el-table-column prop="txhash" label="txhash" align="center"></el-table-column>-->
              <el-table-column prop="time" label="时间" align="center"></el-table-column>
            </el-table>
          </div>

          <div>
            <div style="text-align: center">变化统计图</div>
            <div class="chart">
              <div>
                <span>电量</span>
                <div id="device_en" class="chart_main"></div>
              </div>
              <div>
                <span>电流</span>
                <div id="device_ia" class="chart_main"></div>
              </div>
            </div>
            <div class="chart">
              <div>
                <span>电压</span>
                <div id="device_ua" class="chart_main"></div>
              </div>
              <div>
                <span>功率</span>
                <div id="device_pt" class="chart_main"></div>
              </div>
            </div>
            <div class="chart">
              <div>
                <span>信号强度</span>
                <div id="device_rssi" class="chart_main"></div>
              </div>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </el-drawer>

    <!--分配设备-->
    <el-drawer
      size="70%"
      :title="customerId == null || customerId === '' ? '分配设备' : '添加设备'"
      custom-class="drawer_class"
      :direction="direction"
      :visible.sync="device_distribution_drawer"
    >
      <el-form status-icon ref="device_distribution_data" :model="device_distribution_data" :rules="assets_distribution_rules" label-width="80px" class="assets_distribution_from">
        <el-form-item label="分配客户" prop="customer_id" v-if="customerId == null || customerId === ''">
          <el-select filterable allow-create v-model="device_distribution_data.customer_id" placeholder="请选择分配客户" size="medium">
            <el-option v-for="item in customer_list" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="设备列表" prop="device_id" v-else>
          <el-select filterable allow-create v-model="device_distribution_data.device_id" placeholder="请选择设备" size="medium">
            <el-option v-for="item in device_list" :label="item.name" :value="item.id.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="distribution_device">分配</el-button>
          <el-button @click="distribution_device = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-drawer>

    <!--添加设备属性-->
    <el-dialog :visible.sync="add_attribute_dialog">
      <el-form ref="attribute_from" :rules="attribute_from_rules" :model="attribute_from" label-width="80px">
        <el-form-item label="名称" prop="k"><el-input v-model="attribute_from.k"></el-input></el-form-item>
        <el-form-item label="数值" prop="v"><el-input v-model="attribute_from.v"></el-input></el-form-item>
        <el-form-item>
          <el-button type="primary" @click="add_attribute">{{ update_attribute_boo ? '立即修改' : '立即创建' }}</el-button>
          <el-button @click="add_attribute_dialog = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <!--hash具体信息展示-->
    <el-drawer size="65%" title="信息展示" custom-class="drawer_class" :direction="direction" :visible.sync="block_info_drawer">
      <div class="assets_show_list" v-loading="block_loading">
        <el-table :data="block_info_table" style="width: 100%">
          <el-table-column prop="name"></el-table-column>
          <el-table-column prop="v" min-width="160"></el-table-column>
        </el-table>
      </div>
    </el-drawer>
  </el-container>
</template>

<script>
import {
  add_device,
  del_device,
  update_device,
  search_device,
  device_types,
  device_token,
  public_device,
  dis_device,
  del_dis_device,
  add_device_attributes,
  del_device_attributes,
  device_attributes,
  device_telemetry
} from '@/api/device';
import { search_client_ids, search_client } from '@/api/client';
import DataShowInput from '@/components/DataShowInput';
import { ati_deal, date_format, block_dp } from '@/utils/functions';
import { block_hash_info, block_info } from '@/api/block';

let en_dom, ia_dom, pt_dom, ua_dom, rssi_dom, interval;

let websocket;

export default {
  name: 'device',
  components: {
    DataShowInput
  },
  data() {
    return {
      isCustomer: false,
      customerId: '',
      search: {
        pageNum: 1,
        pageSize: 10,
        search: '',
        total: 0,
        id: '',
        idOffset: '',
        textOffset: ''
      },
      table_data: [],
      add_device_data: {
        name: '',
        type: '',
        label: '',
        description: '',
        gateway: false
      },
      add_device_rules: {
        name: [
          {
            required: true,
            message: '请输入设备名称',
            trigger: 'blur'
          }
        ],
        type: [
          {
            required: true,
            message: '请选择设备类型',
            trigger: 'blur'
          }
        ]
      },
      assets_distribution_rules: {
        customer_id: [
          {
            required: true,
            message: '请选择分配客户',
            trigger: 'blur'
          }
        ]
      },
      device_distribution_data: {
        device_id: '',
        customer_id: ''
      },
      show_table_data: '',
      device_info_drawer: false,
      add_device_drawer: false,
      device_distribution_drawer: false,
      direction: 'rtl',
      customer_list: [],
      device_list: [],
      device_types: '',
      update_data: '',
      update_mode: false,
      activeName: 'first',
      token: '',
      telemetry: [],
      socket_id: '',
      old_socket_id: '',
      selection: '',
      attributes: [],
      attribute_types: [
        {
          label: '客户端属性',
          value: 'USER_SCOPE'
        },
        {
          label: '服务端属性',
          value: 'SERVER_SCOPE'
        },
        {
          label: '共享属性',
          value: 'SHARED_SCOPE'
        }
      ],
      attribute_type: 'USER_SCOPE',
      attribute_search: '',
      add_attribute_dialog: false,
      update_attribute_boo: false,
      attribute_from: {
        k: '',
        v: ''
      },
      attribute_from_rules: {
        k: [
          {
            required: true,
            message: '请输入属性名称',
            trigger: 'blur'
          }
        ],
        v: [
          {
            required: true,
            message: '请输入属性数值',
            trigger: 'blur'
          }
        ]
      },
      telemetry_hash: [],
      loading: false,
      charts_data: {},
      customer_data: {
        '13814000-1dd2-11b2-8080-808080808080': ''
      },
      block_info_drawer: false,
      block_loading: false,
      block_info_table: [],
      falg: 1
    };
  },
  methods: {
    //时间格式
    lastUpdateTsdataformat(val) {
      var date = new Date(val.lastUpdateTs);
      var y = date.getFullYear();
      var m = date.getMonth() + 1;
      m = m < 10 ? '0' + m : m;
      var d = date.getDate();
      d = d < 10 ? '0' + d : d;
      var h = date.getHours();
      h = h < 10 ? '0' + h : h;
      var minute = date.getMinutes();
      var second = date.getSeconds();
      minute = minute < 10 ? '0' + minute : minute;
      second = second < 10 ? '0' + second : second;
      return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second;
    },
    search_device() {
      this.loading = true;
      this.search.idOffset = '';
      this.search.textOffset = '';
      search_device(this.search).then(res => {
        if (res.success) {
          let data = res.data;
          for (let i = 0; i < data.length; i++) {
            let cId = data[i].customerId.id;
            let c = this.customer_data[cId];
            if (c) {
              data[i].cName = c;
            } else {
              data[i].cName = '';
              this.customer_data[cId] = false;
            }
          }
          this.table_data = data;
          let ids = '';
          for (let k in this.customer_data) {
            if (!this.customer_data[k]) {
              ids = ids + ',' + k;
            }
          }
          if (ids !== '') {
            search_client_ids(ids).then(res => {
              if (res.success && res.data != null) {
                for (let k in res.data) {
                  this.customer_data[k] = res.data[k];
                }
                for (let i = 0; i < data.length; i++) {
                  let cId = data[i].customerId.id;
                  let c = this.customer_data[cId];
                  if (c) {
                    data[i].cName = c;
                  } else {
                    data[i].cName = '';
                    this.customer_data[cId] = false;
                  }
                }
                this.table_data = data;
              }
            });
          }
          this.add_device_drawer = false;
          this.device_distribution_drawer = false;
          this.search.textOffset = res.textOffset;
          this.search.idOffset = res.idOffset;
        } else {
          this.$message({
            type: 'warning',
            message: res.message
          });
        }
        this.loading = false;
      });
    },
    get_types(f) {
      if (this.customerId == null || this.customerId === '') {
        device_types().then(res => {
          if (res.success) {
            this.device_types = res.data;
            if (f) {
              this.add_device_drawer = true;
            } else {
              this.update_mode = true;
            }
          } else {
            this.$message({
              type: 'warning',
              message: '没有获取到设备类型列表'
            });
          }
        });
      } else {
        search_device(this.search).then(res => {
          if (res.success) {
            this.device_list = res.data;
            this.device_distribution_drawer = true;
            this.device_distribution_data.customer_id = this.customerId;
          }
        });
      }
    },
    info_device(row) {
      let token = this.$store.state.user.token;
      token = token.substring(7);
      websocket = new WebSocket('ws://125.64.98.21:8088/api/ws/plugins/telemetry?token=' + token);
      if (this.socket_id != null && this.socket_id !== '' && this.socket_id !== row.id.id) {
        this.old_socket_id = this.socket_id;
      }
      this.socket_id = row.id.id;
      row = ati_deal(row);
      let ati = row.additionalInfo;
      if (!ati) {
        row.additionalInfo['gateway'] = false;
        row.additionalInfo['description'] = null;
      } else {
        if (!ati.description) {
          row.additionalInfo['description'] = null;
        }
        if (!ati.gateway) {
          row.additionalInfo['gateway'] = false;
        }
      }
      this.show_table_data = [
        {
          k: '设备名称',
          v: row.name
        },
        {
          k: '设备TOKEN',
          v: '没有获取到设备token'
        },
        {
          k: '设备类型',
          v: row.type
        },
        {
          k: '设备标签',
          v: row.label
        },
        {
          k: '网关设备',
          v: row.additionalInfo.gateway
        },
        {
          k: '设备说明',
          v: row.additionalInfo.description
        },
        {
          k: '添加时间',
          v: date_format(row.createdTime)
        }
      ];
      device_token(row.id.id).then(res => {
        if (res.success) {
          this.show_table_data[1].v = res.data;
        } else {
          this.$message({
            type: 'warning',
            message: res.message
          });
        }
      });
      this.update_data = row;
      this.direction = 'rtl';
      this.device_info_drawer = true;
    },
    del_device(id) {
      this.$confirm('确定删除该设备, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          del_device({
            deviceId: id.id
          }).then(res => {
            if (res.success) {
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
              this.search_device();
            } else {
              this.$message({
                type: 'warning',
                message: res.message
              });
            }
          });
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
    },
    add_device() {
      this.$refs['add_device_data'].validate(valid => {
        if (valid) {
          add_device({
            name: this.add_device_data.name,
            type: this.add_device_data.type,
            gateway: this.add_device_data.gateway,
            description: this.add_device_data.description,
            label: this.add_device_data.label
          }).then(res => {
            if (res.success) {
              this.search_device();
            } else {
              this.$message({
                type: 'info',
                message: res.message
              });
            }
          });
        } else {
          return false;
        }
      });
    },
    distribution_button(id) {
      search_client({
        limit: 50,
        search: ''
      }).then(res => {
        if (res.success) {
          let data = res.data;
          this.customer_list = [];
          for (let i = 0; i < data.length; i++) {
            this.customer_list[this.customer_list.length] = {
              name: data[i].name,
              id: data[i].id.id
            };
          }
          this.device_distribution_data.device_id = id;
          this.device_distribution_drawer = true;
        } else {
          this.$message({
            type: 'info',
            message: res.message
          });
        }
      });
    },
    distribution_device() {
      dis_device({
        deviceId: this.device_distribution_data.device_id,
        customerId: this.device_distribution_data.customer_id
      }).then(res => {
        if (res.success) {
          this.$message({
            type: 'success',
            message: '设备分配成功'
          });
          this.search_device();
        } else {
          this.$message({
            type: 'info',
            message: res.message
          });
        }
      });
    },
    public_device(id) {
      public_device({
        deviceId: id
      }).then(r => {
        if (r.data.success) {
          this.$message({
            type: 'success',
            message: '设备已公开'
          });
          this.search_device();
        } else {
          this.$message({
            type: 'info',
            message: r.data.message
          });
        }
      });
    },
    del_distribution(id) {
      this.$confirm('确定取消该设备的分配, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(res => {
        del_dis_device({
          deviceId: id.id
        }).then(res => {
          if (res.success) {
            this.$message({
              type: 'success',
              message: '取消分配成功'
            });
            this.search_device();
          }
        });
      });
    },
    update_info() {
      this.$refs['update_data'].validate(valid => {
        if (valid) {
          update_device(this.update_data).then(res => {
            if (res.success) {
              this.$message({
                type: 'info',
                message: res.message
              });
              let data = res.data;
              this.update_tenant_admin_data = data;
              this.info_device(data);
              this.update_mode = false;
            } else {
              this.$message({
                type: 'info',
                message: res.message
              });
            }
          });
        } else {
          return false;
        }
      });
    },
    table_switch(t, e) {
      this.clear_selection();
      let thi = this;
      let i = t.index;
      if (i === '1') {
        if (interval) {
          clearInterval(interval);
          this.charts_data = {};
        }
        thi.get_attributes();
      } else if (i === '2') {
        thi.telemetry_chart('EN,IA,PT,UA,RSSI,Txhash', thi.socket_id, thi);
        /*生成图表*/
        interval = setInterval(() => {
          thi.telemetry_chart('EN,IA,PT,UA,RSSI,Txhash', thi.socket_id, thi);
        }, 5000);
        /*websocket获取最新遥测数据*/
        if (thi.old_socket_id === '' || thi.old_socket_id === null) {
          websocket.send(
            JSON.stringify({
              tsSubCmds: [
                {
                  cmdId: 2,
                  entityType: 'DEVICE',
                  scope: 'LATEST_TELEMETRY',
                  entityId: thi.socket_id
                }
              ],
              attrSubCmds: [
                {
                  cmdId: 1,
                  entityType: 'DEVICE',
                  scope: 'CLIENT_SCOPE',
                  entityId: thi.socket_id
                },
                {
                  cmdId: 3,
                  entityType: 'DEVICE',
                  scope: 'CLIENT_SCOPE',
                  entityId: thi.socket_id
                }
              ],
              historyCmds: []
            })
          );
        } else {
          websocket.send(
            JSON.stringify({
              tsSubCmds: [],
              historyCmds: [],
              attrSubCmds: [
                {
                  entityType: 'DEVICE',
                  entityId: thi.old_socket_id,
                  scope: 'CLIENT_SCOPE',
                  cmdId: 3,
                  unsubscribe: true
                }
              ]
            })
          );
          websocket.send(
            JSON.stringify({
              tsSubCmds: [],
              historyCmds: [],
              attrSubCmds: [
                {
                  entityType: 'DEVICE',
                  entityId: thi.socket_id,
                  scope: 'CLIENT_SCOPE',
                  cmdId: 4
                }
              ]
            })
          );
          websocket.send(
            JSON.stringify({
              tsSubCmds: [
                {
                  entityType: 'DEVICE',
                  entityId: thi.socket_id,
                  scope: 'LATEST_TELEMETRY',
                  cmdId: 5
                }
              ],
              historyCmds: [],
              attrSubCmds: []
            })
          );
          websocket.send(
            JSON.stringify({
              tsSubCmds: [
                {
                  entityType: 'DEVICE',
                  entityId: thi.old_socket_id,
                  scope: 'LATEST_TELEMETRY',
                  cmdId: 2,
                  unsubscribe: true
                }
              ],
              historyCmds: [],
              attrSubCmds: []
            })
          );
        }
        let data = null;
        websocket.onmessage = e => {
          let j = JSON.parse(e.data);
          if (j != null && j.data != null) {
            data = j.data;
            let i = 0;
            for (let k in data) {
              thi.telemetry = i === 0 ? [] : thi.telemetry;
              thi.telemetry[thi.telemetry.length] = {
                name: k,
                time: date_format(data[k][0][0]),
                v: data[k][0][1]
              };
              i++;
            }
          }
        };
      }
      if (interval) {
        clearInterval(interval);
        this.charts_data = {};
      }
    },
    selection_change(v) {
      this.selection = v;
    },
    c() {
      alert('在部件上显示该遥测数据');
      console.log(this.selection);
    },
    clear_selection() {
      this.$refs.multipleTable.clearSelection();
      this.$refs.attributes_table.clearSelection();
    },
    get_attributes() {
      if (this.attribute_type === '') {
        this.attributes = [];
      } else {
        device_attributes(this.socket_id, this.attribute_type).then(res => {
          if (res.success) {
            let data = res.data;
            if (this.attribute_search !== '') {
              let ds = [];
              for (let i = 0; i < data.length; i++) {
                if (data[i].key.indexOf(this.attribute_search) > -1) {
                  data[i].value = data[i].value === false || data[i].value === true ? (data[i].value = data[i].value.toString()) : data[i].value;
                  ds[ds.length] = data[i];
                }
              }
              this.attributes = ds;
            } else {
              for (let i = 0; i < data.length; i++) {
                data[i].value = data[i].value === false || data[i].value === true ? (data[i].value = data[i].value.toString()) : data[i].value;
              }
              this.attributes = data;
            }
          } else {
            this.$message({
              type: 'warning',
              message: data.message
            });
          }
        });
      }
      this.add_attribute_dialog = false;
    },
    re_attributes() {
      this.get_attributes();
      this.$message({
        type: 'success',
        message: '已刷新'
      });
    },
    update_attribute(row) {
      this.attribute_from.k = row.key;
      this.attribute_from.v = row.value;
      this.update_attribute_boo = true;
      this.add_attribute_dialog = true;
    },
    add_attribute_button() {
      this.update_attribute_boo = false;
      this.add_attribute_dialog = true;
    },
    add_attribute: function() {
      this.$refs['attribute_from'].validate(valid => {
        if (valid) {
          add_device_attributes({
            id: this.socket_id,
            type: this.attribute_type,
            attribute: '{"' + this.attribute_from.k + '": "' + this.attribute_from.v + '"}'
          }).then(res => {
            if (res.success) {
              this.attribute_from.k = '';
              this.attribute_from.v = '';
              this.get_attributes();
              this.update_attribute_boo = false;
            } else {
              this.$message({
                type: 'info',
                message: res.message
              });
            }
          });
        } else {
          return false;
        }
      });
    },
    del_attribute() {
      let ks = [];
      for (let i = 0; i < this.selection.length; i++) {
        let s = this.selection[i];
        ks[ks.length] = s.key;
      }
      this.$confirm('确定删除该属性, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(res => {
        del_device_attributes({
          deviceId: this.socket_id,
          ks: ks
        }).then(r => {
          if (r.data.success) {
            this.$message({
              type: 'success',
              message: r.data.message
            });
            this.get_attributes();
          } else {
            this.$message({
              type: 'info',
              message: r.data.message
            });
          }
        });
      });
    },
    telemetry_chart(keys, deviceId, thi) {
      device_telemetry(keys, deviceId).then(res => {
        if (res.success && res.data && res.data.EN.length > 0) {
          let th = res.data.Txhash;
          if (th && th.length > 0) {
            let list = [];
            for (let i = 0; i < th.length && i < 5; i++) {
              list.push({
                txhash: th[i].value,
                time: date_format(th[i].ts),
                ts: th[i].ts
              });
            }
            if (!thi.telemetry_hash || thi.telemetry_hash.length < 1) {
              thi.telemetry_hash = list;
            } else {
              list = list.reverse();
              let ll = list.length;
              let old_list = thi.telemetry_hash.reverse();
              let ol = old_list.length;
              for (let i = 0; i < ll; i++) {
                if (list[i].ts > old_list[ol - 1].ts) {
                  old_list.shift();
                  old_list.push(list[i]);
                }
              }
              thi.telemetry_hash = old_list.reverse();
            }
          }
          thi.charts_data.EN = thi.charts_data_update(thi, res.data.EN, thi.charts_data.EN);
          thi.charts_data.PT = thi.charts_data_update(thi, res.data.PT, thi.charts_data.PT);
          thi.charts_data.IA = thi.charts_data_update(thi, res.data.IA, thi.charts_data.IA);
          thi.charts_data.UA = thi.charts_data_update(thi, res.data.UA, thi.charts_data.UA);
          thi.charts_data.RSSI = thi.charts_data_update(thi, res.data.RSSI, thi.charts_data.RSSI);
          en_dom = en_dom ? en_dom : this.$echarts.init(document.getElementById('device_en'));
          pt_dom = pt_dom ? pt_dom : this.$echarts.init(document.getElementById('device_pt'));
          ia_dom = ia_dom ? ia_dom : this.$echarts.init(document.getElementById('device_ia'));
          ua_dom = ua_dom ? ua_dom : this.$echarts.init(document.getElementById('device_ua'));
          rssi_dom = rssi_dom ? rssi_dom : this.$echarts.init(document.getElementById('device_rssi'));
          thi.charts_option_update(en_dom, thi.charts_data.EN);
          thi.charts_option_update(pt_dom, thi.charts_data.PT);
          thi.charts_option_update(ia_dom, thi.charts_data.IA);
          thi.charts_option_update(ua_dom, thi.charts_data.UA);
          thi.charts_option_update(rssi_dom, thi.charts_data.RSSI);
        }
      });
    },
    charts_option_update(dom, data) {
      let option = {
        tooltip: {
          trigger: 'axis',
          formatter: function(params) {
            return params[0].value[0] + ' : ' + params[0].value[1];
          },
          axisPointer: {
            animation: false
          }
        },
        xAxis: {
          type: 'time',
          splitLine: {
            show: false
          }
        },
        yAxis: {
          type: 'value',
          boundaryGap: [0, '100%'],
          splitLine: {
            show: false
          }
        },
        series: [
          {
            name: '模拟数据',
            type: 'line',
            showSymbol: false,
            hoverAnimation: false,
            data: data
          }
        ]
      };
      dom.setOption(option);
    },
    charts_data_update(thi, ens, old_data) {
      ens = ens.reverse();
      if (!old_data || old_data.length < 1) {
        old_data = [];
        for (let i = 0, l = ens.length; i < l; i++) {
          let en = ens[i];
          old_data[old_data.length] = {
            ts: en.ts,
            value: [date_format(en.ts), en.value]
          };
        }
      } else {
        let ol = old_data.length;
        let last = old_data[ol - 1];
        for (let i = 0, l = ens.length; i < l; i++) {
          let en = ens[i];
          if (en.ts > last.ts) {
            if (ol > 99) {
              old_data.shift();
            }
            old_data.push({
              ts: en.ts,
              value: [date_format(en.ts), en.value]
            });
          }
        }
      }
      return old_data;
    },
    info_close() {
      this.activeName = 'first';
      if (websocket) {
        websocket.onclose = () => {};
      }
      if (interval) {
        clearInterval(interval);
        this.charts_data = {};
      }
    },
    show_block_info(hash) {
      this.block_info_drawer = true;
      block_hash_info(hash)
        .then(res => {
          console.log(res);
          if (res.success) {
            let data = res.data.result;
            let blockNum = parseInt(data.blockNumber, 16);
            let time = parseInt(data.timestamp, 16);
            let date = date_format(time * 1000);
            let number = parseInt(data.gas, 16);
            let dpUsed = number + 'm/s';
            let nonce = parseInt(data.nonce, 16);
            let gasPrice = parseInt(data.gasPrice, 16);
            let allUsed = number * gasPrice;
            let newBlockNum = parseInt(data.newBlockNum.substring(2), 16);

            var resultStr = [];
            let s = data.input.substring(2);
            let l = s.length;
            for (let i = 0; i < l; i += 2) {
              let curCharCode = parseInt(s.substr(i, 2), 16);
              resultStr.push(String.fromCharCode(curCharCode));
            }
            let content = resultStr.join('');
            this.block_info_table = [
              {
                name: 'hash',
                v: data.hash
              },
              {
                name: '出款地址',
                v: data.from
              },
              {
                name: '收款地址',
                v: data.to
              },
              {
                name: '区块hash',
                v: data.blockHash
              },
              {
                name: '交易时间',
                v: date
              },
              {
                name: '交易区块',
                v: blockNum
              },
              {
                name: 'DP使用',
                v: dpUsed
              },
              {
                name: 'Gas单价',
                v: block_dp(gasPrice)
              },
              {
                name: '交易确认',
                v: newBlockNum - blockNum
              },
              {
                name: '出资地址历史交易次数',
                v: nonce
              },
              {
                name: '交易总消耗',
                v: block_dp(allUsed)
              },
              {
                name: '数据',
                v: data.input
              },
              {
                name: '数据翻译',
                v: content
              }
            ];
          } else {
            this.$message({
              type: 'info',
              message: res.message
            });
          }
          this.block_loading = false;
        })
        .catch(e => {
          this.block_loading = false;
        });
    }
  },
  created() {
    let id = '';
    let user = this.$store.state.user.user;
    if (user.authority === 'CUSTOMER_USER') {
      id = user.customerId.id;
      this.isCustomer = true;
    } else {
      this.isCustomer = false;
      let url = window.location.href;
      let number = url.lastIndexOf('customerId=');
      id = number > 1 ? url.substr(number + 11) : '';
    }
    console.log(this.isCustomer);
    this.customerId = id;
    this.search.id = id;
    this.search_device();
  },
  mounted() {
    this.$nextTick(() => {
      let that = this;
      window.onscroll = function() {
        //变量scrollTop是滚动条滚动时，距离顶部的距离
        var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        //变量windowHeight是可视区的高度
        var windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
        //变量scrollHeight是滚动条的总高度
        var scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
        //滚动条到底部的条件

        if (windowHeight + scrollTop >= scrollHeight - 500 && that.falg == 1) {
          //到了这个就可以进行业务逻辑加载后台数据了
          console.log('到了底部');
          //console.log(that.search)
          that.falg = 0;
          search_device(that.search).then(res => {
            if (res.success) {
              let data = res.data;
              for (let i = 0; i < data.length; i++) {
                let cId = data[i].customerId.id;
                let c = that.customer_data[cId];
                if (c) {
                  data[i].cName = c;
                } else {
                  data[i].cName = '';
                  that.customer_data[cId] = false;
                }
              }

              that.table_data = that.table_data.concat(data);
              let ids = '';
              for (let k in that.customer_data) {
                if (!that.customer_data[k]) {
                  ids = ids + ',' + k;
                }
              }

              if (ids !== '') {
                search_client_ids(ids).then(res => {
                  if (res.success && res.data != null) {
                    for (let k in res.data) {
                      that.customer_data[k] = res.data[k];
                    }
                    for (let i = 0; i < data.length; i++) {
                      let cId = data[i].customerId.id;
                      let c = that.customer_data[cId];
                      if (c) {
                        data[i].cName = c;
                      } else {
                        data[i].cName = '';
                        that.customer_data[cId] = false;
                      }
                    }
                    that.table_data = that.table_data.concat(data);
                  }
                });
              }
              that.add_device_drawer = false;
              that.device_distribution_drawer = false;
              that.search.textOffset = res.textOffset;
              that.search.idOffset = res.idOffset;
              that.falg = 1;
              //console.log(data)
            } else {
              //console.log(res)
              that.$message({
                type: 'warning',
                message: res.message
              });
              that.falg = 1;
            }
            //console.log(that.table_data.length)
            //this.loading = false;
            window.scrollTo(0, scrollTop - 500);
          });
        }
      };
    });
  }
};
</script>

<style lang="scss" scoped>
.close_button {
  float: right;
  border: none;
  z-index: 1000;
  height: 0.918rem;
  border-radius: 0;
  position: relative;
  border-bottom: 0.038rem solid #e4e7ed;
}

.transition-box {
  margin-bottom: 10px;
  width: 200px;
  height: 100px;
  border-radius: 4px;
  background-color: #409eff;
  text-align: center;
  color: #fff;
  padding: 40px 20px;
  box-sizing: border-box;
  margin-right: 20px;
}

.chart {
  display: flex;

  div {
    display: flex;
    flex-direction: column;
    width: 49.9%;

    span {
      font-weight: bold;
      font-size: 24px;
      display: flex;
      justify-content: center;
    }
  }
}

.chart > div > .chart_main {
  width: 600px;
  height: 400px;
  display: inline-block;
}
</style>
