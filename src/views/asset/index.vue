<template>
<el-container id="assets_manage" v-loading="loading">
    <el-header class="user_search">
        <el-row>
            <el-col :span="24">
                <div class="grid-content bg-purple-dark">
                    <el-row :gutter="20">
                        <el-col :span="8">
                            <div>
                                <el-input class="search_input" placeholder="请输入搜索条件" v-model="search_form.search" clearable></el-input>
                            </div>
                        </el-col>
                        <el-col :span="1.5">
                            <el-button type="primary" @click="search_assets" icon="el-icon-search" round>资产搜索</el-button>
                        </el-col>
                        <el-col :span="1.5" v-if="!isCustomer">
                            <el-button round @click="add_button(true)" icon="el-icon-plus" class="spacing20">添加资产</el-button>
                        </el-col>
                    </el-row>
                </div>
            </el-col>
        </el-row>
    </el-header>
    <el-main>
        <!--资产列表-->
        <el-table :data="table_data" style="width: 100%">
            <el-table-column label="资产名称" prop="name"></el-table-column>
            <el-table-column label="资产类型" prop="type"></el-table-column>
            <el-table-column label="拥有人" prop="cName"></el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button class="round_button" @click="assets_info(scope.row)" title="详细信息">
                        <svg class="bld_icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="200" height="200">
                            <path d="M828.5 886.3H238.4c-9.9 0-18-8.1-18-18v-4c0-9.9 8.1-18 18-18h590.1c9.9 0 18 8.1 18 18v4c0 9.9-8.1 18-18 18zM828.5 684.6H238.4c-9.9 0-18-8.1-18-18v-4c0-9.9 8.1-18 18-18h590.1c9.9 0 18 8.1 18 18v4c0 9.9-8.1 18-18 18zM409 449.5H230.2c-17.6 0-32-14.4-32-32V238.7c0-17.6 14.4-32 32-32H409c17.6 0 32 14.4 32 32v178.8c0 17.6-14.4 32-32 32z m-170.8-40H401V246.7H238.2v162.8zM822.4 437.5H552.9c-11 0-20-9-20-20s9-20 20-20h269.5c11 0 20 9 20 20s-9 20-20 20zM822.4 269.5H552.9c-11 0-20-9-20-20s9-20 20-20h269.5c11 0 20 9 20 20s-9 20-20 20z" fill="#888888"></path>
                            <path d="M884.4 1024H182.5c-46.3 0-83.9-37.7-83.9-83.9V91.9C98.6 45.7 136.3 8 182.5 8h701.9c46.3 0 83.9 37.7 83.9 83.9V940c0 46.3-37.7 84-83.9 84zM182.5 48c-24.2 0-43.9 19.7-43.9 43.9V940c0 24.2 19.7 43.9 43.9 43.9h701.9c24.2 0 43.9-19.7 43.9-43.9V91.9c0-24.2-19.7-43.9-43.9-43.9H182.5z" fill="#888888"></path>
                        </svg>
                    </el-button>
                    <template v-if="!isCustomer">
                        <el-button class="round_button" @click="public_asset(scope.row.id.id)" v-if="scope.row.customerId.id === '13814000-1dd2-11b2-8080-808080808080' && (customer_id === '' || customer_id == null)" title="公开资产">
                            <svg class="bld_icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="200" height="200">
                                <path d="M512.021333 1024c-201.557333 0-365.525333-164.010667-365.525333-365.589333 0-201.514667 163.968-365.461333 365.525333-365.461334 201.514667 0 365.482667 163.946667 365.482667 365.461334 0 201.6-163.968 365.589333-365.482667 365.589333z m0-688.384c-178.026667 0-322.858667 144.810667-322.858666 322.794667C189.162667 836.48 333.994667 981.333333 512.021333 981.333333c178.005333 0 322.816-144.853333 322.816-322.922666 0-177.984-144.810667-322.794667-322.816-322.794667z"></path>
                                <path d="M306.965333 397.632a21.333333 21.333333 0 0 1-21.333333-21.333333V203.328C285.632 91.221333 380.885333 0 497.941333 0h28.053334c117.098667 0 212.373333 91.221333 212.373333 203.328a21.333333 21.333333 0 1 1-42.666667 0C695.701333 114.730667 619.584 42.666667 525.994667 42.666667h-28.053334c-93.546667 0-169.642667 72.064-169.642666 160.661333v172.970667a21.333333 21.333333 0 0 1-21.333334 21.333333zM575.296 596.714667a63.317333 63.317333 0 0 0-126.592 0c0 28.373333 18.752 51.370667 44.245333 59.52v127.317333h37.952v-127.317333c25.557333-8.149333 44.394667-31.146667 44.394667-59.52z"></path>
                            </svg>
                        </el-button>
                        <el-button class="round_button" @click="distribution_button(scope.row.id.id)" v-if="scope.row.customerId.id === '13814000-1dd2-11b2-8080-808080808080' && (customer_id === '' || customer_id == null)" title="分配资产">
                            <svg class="bld_icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="200" height="200">
                                <path d="M512 22C241.38 22 22 241.38 22 512s219.38 490 490 490 490-219.38 490-490S782.62 22 512 22zM306.32 418.81a58.143 58.143 0 0 1 50.35-29.07h208.37l-16.26-16.25a58.13 58.13 0 0 1-15.32-56.3c5.36-20.16 21.11-35.89 41.27-41.25 20.16-5.35 41.64 0.51 56.29 15.35h0.04l115.48 115.47a57.96 57.96 0 0 1 13.33 20.75c0.06 0.16 0.11 0.31 0.17 0.47 0.15 0.42 0.31 0.85 0.45 1.28a58.145 58.145 0 0 1-4.73 47.7c-10.39 17.98-29.58 29.07-50.35 29.07H356.67c-20.77 0-39.96-11.09-50.35-29.07a58.138 58.138 0 0 1 0-58.15z m449.45 232.51c-10.39 17.98-29.58 29.07-50.35 29.07H497.01l16.21 16.21a58.145 58.145 0 0 1 15.34 56.29 58.122 58.122 0 0 1-41.24 41.26 58.13 58.13 0 0 1-56.3-15.32L315.55 663.37a58.12 58.12 0 0 1-15.35-56.29 58.118 58.118 0 0 1 41.25-41.26c6.7-1.78 13.56-2.32 20.25-1.71h343.72c20.77 0 39.96 11.09 50.35 29.07a58.12 58.12 0 0 1 0 58.14z"></path>
                            </svg>
                        </el-button>
                        <el-button class="round_button" @click="del_distribution(scope.row.id.id)" v-if="scope.row.customerId.id !== '13814000-1dd2-11b2-8080-808080808080'" title="取消分配">
                            <svg class="bld_icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2689" width="200" height="200">
                                <path d="M903.68 720.896m-20.48 0a20.48 20.48 0 1 0 40.96 0 20.48 20.48 0 1 0-40.96 0Z" fill="#231815" p-id="2690"></path>
                                <path d="M903.68 774.656c-11.264 0-20.48 9.216-20.48 20.48v61.44c0 16.896-13.824 30.72-30.72 30.72h-680.96c-16.896 0-30.72-13.824-30.72-30.72V246.784c0-16.896 13.824-30.72 30.72-30.72h105.472v34.304c0 22.528 18.432 40.96 40.96 40.96h388.096c22.528 0 40.96-18.432 40.96-40.96v-34.304h105.472c16.896 0 30.72 13.824 30.72 30.72v397.824c0 11.264 9.216 20.48 20.48 20.48s20.48-9.216 20.48-20.48V246.784c0-39.424-32.256-71.68-71.68-71.68h-105.472v-38.912c0-22.528-18.432-40.96-40.96-40.96H317.952c-22.528 0-40.96 18.432-40.96 40.96v38.912H171.52c-39.424 0-71.68 32.256-71.68 71.68v609.792c0 39.424 32.256 71.68 71.68 71.68h680.96c39.424 0 71.68-32.256 71.68-71.68v-61.44c0-11.264-9.216-20.48-20.48-20.48zM317.952 136.192h388.096V250.88H317.952V136.192z" fill="#231815" p-id="2691"></path>
                                <path d="M705.024 398.336c-8.192-8.192-20.992-8.192-29.184 0l-163.84 163.84-164.352-163.84c-8.192-8.192-20.992-8.192-29.184 0-8.192 8.192-8.192 20.992 0 29.184l164.352 164.352-164.352 164.352c-8.192 8.192-8.192 20.992 0 29.184 4.096 4.096 9.216 6.144 14.336 6.144s10.24-2.048 14.336-6.144l164.352-164.352 164.352 164.352c4.096 4.096 9.216 6.144 14.336 6.144s10.24-2.048 14.336-6.144c8.192-8.192 8.192-20.992 0-29.184l-164.352-164.352 164.352-164.352c8.192-8.192 8.192-21.504 0.512-29.184z" fill="#231815" p-id="2692"></path>
                            </svg>
                        </el-button>
                        <el-button class="round_button" @click="del_assets(scope.row.id)" slot="reference" v-if="customer_id == '' || customer_id == null" title="删除资产">
                            <svg class="bld_icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2330" width="200" height="200">
                                <path d="M967.111 227.556H739.556V56.889H284.444v170.667H56.89v56.888h113.778v682.667h682.666V284.444h113.778v-56.888zM341.333 113.778h341.334v113.778H341.333V113.778z m455.111 796.444H227.556V284.444h568.888v625.778z" fill="#73777A" p-id="2331"></path>
                                <path d="M398.222 341.333h56.89v512h-56.89z m170.667 0h56.889v512h-56.89z" fill="#73777A"></path>
                            </svg>
                        </el-button>
                    </template>
                </template>
            </el-table-column>
        </el-table>
    </el-main>

    <!--添加资产-->
    <el-drawer size="70%" title="添加新资产" custom-class="drawer_class" :visible.sync="add_assets_drawer" :direction="direction">
        <el-form status-icon ref="add_assets_data" :model="add_assets_data" :rules="add_assets_rules" label-width="80px" class="assets_add_from">
            <el-form-item label="名称" prop="name">
                <el-input v-model="add_assets_data.name"></el-input>
            </el-form-item>
            <el-form-item label="资产类型" prop="type">
                <el-select filterable allow-create v-model="add_assets_data.type" placeholder="请选择资产类型">
                    <el-option v-for="item in assets_types" :key="item" :label="item" :value="item">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="标签">
                <el-input v-model="add_assets_data.label"></el-input>
            </el-form-item>
            <el-form-item label="详细说明">
                <el-input v-model="add_assets_data.description"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="add_assets">立即创建</el-button>
                <el-button @click="add_assets_drawer = false">取消</el-button>
            </el-form-item>
        </el-form>
    </el-drawer>

    <!--详细信息-->
    <el-drawer size="70%" title="资产详细信息" custom-class="drawer_class" :direction="direction" :visible.sync="assets_info_drawer">
        <div class="assets_show_list">
            <div v-if="!update_mode">
                <template v-for="data1 in show_table_data">
                    <DataShowInput :data1="data1"></DataShowInput>
                </template>
                <el-button class="show_button update_button" @click="update_button" v-if="!isCustomer">修改信息</el-button>
            </div>

            <el-form status-icon ref="update_data" :model="update_data" :rules="add_assets_rules" label-width="80px" v-if="update_mode">
                <el-form-item label="名称" prop="name">
                    <el-input v-model="update_data.name"></el-input>
                </el-form-item>
                <el-form-item label="资产类型" prop="type">
                    <el-select filterable allow-create v-model="update_data.type" placeholder="请选择资产类型">
                        <el-option v-for="item in assets_types" :key="item" :label="item" :value="item">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="标签">
                    <el-input v-model="update_data.label"></el-input>
                </el-form-item>
                <el-form-item label="详细说明">
                    <el-input v-model="update_data.additionalInfo.description"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button class="show_button" @click="update_info">确认修改</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button class="show_button" type="primary" @click="update_mode = false">取消修改</el-button>
                </el-form-item>
            </el-form>
        </div>
    </el-drawer>

    <!--分配资产-->
    <el-drawer size="70%" :title="customer_id === '' || customer_id == null ? '分配资产' : '添加资产'" custom-class="drawer_class" :direction="direction" :visible.sync="assets_distribution_drawer">
        <el-form status-icon ref="assets_distribution_data" :model="assets_distribution_data" :rules="assets_distribution_rules" label-width="80px" class="assets_distribution_from">
            <el-form-item label="资产类型" prop="customer_id" v-if="customer_id === '' || customer_id == null">
                <el-select v-model="assets_distribution_data.customer_id" placeholder="请选择分配客户" size="medium">
                    <el-option :key="item.id.id" v-for="item in customer_list" :label="item.name" :value="item.id.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="资产列表" prop="assets_id" v-else>
                <el-select v-model="assets_distribution_data.assets_id" placeholder="请选择添加的资产" size="medium">
                    <el-option :key="item.id.id" v-for="item in assets_list" :label="item.name" :value="item.id.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="distribution_assets">分配</el-button>
                <el-button @click="add_assets_drawer = false">取消</el-button>
            </el-form-item>
        </el-form>
    </el-drawer>
</el-container>
</template>

<script>
import DataShowInput from "@/components/DataShowInput"
import {
    search_client_ids,
    search_client
} from "@/api/client"
import {
    add_asset,
    del_asset,
    update_asset,
    search_asset,
    public_asset,
    dis_asset,
    delDis_asset,
    asset_types
} from "@/api/asset"

export default {
    name: "asset",
    components: {
        DataShowInput
    },
    data() {
        return {
            isCustomer: false,
            customer_id: '',
            search_form: {
                limit: 50,
                search: '',
                id: ''
            },
            table_data: [],
            show_table_data: '',
            add_assets_data: {
                label: '',
                name: '',
                type: '',
                description: ''
            },
            assets_distribution_data: {
                assets_id: '',
                customer_id: ''
            },
            assets_info_drawer: false,
            add_assets_drawer: false,
            assets_distribution_drawer: false,
            direction: 'rtl',
            add_assets_rules: {
                name: [{
                    required: true,
                    message: '请输入名称',
                    trigger: 'blur'
                }, ],
                type: [{
                    required: true,
                    message: '请选择资产类型',
                    trigger: 'blur'
                }, ]
            },
            assets_distribution_rules: {
                customer_id: [{
                    required: true,
                    message: '请选择分配客户',
                    trigger: 'blur'
                }, ]
            },
            assets_types: '',
            customer_list: '',
            assets_list: [],
            loading: false,
            update_data: '',
            update_mode: false,
            customer_data: {
                "13814000-1dd2-11b2-8080-808080808080": ''
            }
        }
    },
    methods: {
        search_assets() {
            search_asset(this.search_form).then(res => {
                if (res.success) {
                    let data = res.data;
                    for (let i = 0; i < data.length; i++) {
                        let d = data[i];
                        let cId = d.customerId.id;
                        let c = this.customer_data[cId];
                        if (c) {
                            d.cName = c.name
                        } else {
                            d.cName = '';
                            this.customer_data[cId] = false
                        }
                    }
                    this.table_data = data;
                    let ids = '';
                    for (let k in this.customer_data) {
                        if (!this.customer_data[k]) {
                            ids = ids + "," + k
                        }
                    }
                    search_client_ids(ids).then(res => {
                        if (res.success && res.data != null) {
                            for (let k in res.data) {
                                this.customer_data[k] = res.data[k]
                            }
                            for (let i = 0; i < data.length; i++) {
                                let cId = data[i].customerId.id;
                                let c = this.customer_data[cId];
                                if (c) {
                                    data[i].cName = c
                                } else {
                                    data[i].cName = '';
                                    this.customer_data[cId] = false
                                }
                            }
                            this.table_data = data;
                        }
                    });
                    this.assets_distribution_drawer = false;
                    this.loading = false
                }
            })
        },
        assets_info(row) {
            let ati = row.additionalInfo;
            if (!ati) {
                row.additionalInfo = {
                    'description': null
                }
            } else if (!ati.description) {
                row.additionalInfo['description'] = null
            }
            this.direction = "rtl";
            this.update_data = row;
            this.assets_info_drawer = true;
            this.show_table_data = [{
                k: '名称',
                v: row.name
            }, {
                k: '类型',
                v: row.type
            }, {
                k: '标签',
                v: row.label
            }, {
                k: '说明',
                v: row.additionalInfo.description
            }];
        },
        del_assets(id) {
            this.$confirm('确定删除该资产, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.loading = true;
                del_asset({
                    'assetId': id.id
                }).then(res => {
                    if (res.success) {
                        this.search_assets();
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                    } else {
                        this.$message({
                            type: 'warning',
                            message: res.message
                        });
                        this.loading = false
                    }
                })
            }).catch(() => {
                this.loading = false;
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        },
        add_button(f) {
            if (this.customer_id === '' || this.customer_id == null) {
                asset_types().then(res => {
                    if (res.success) {
                        this.assets_types = res.data;
                        if (f) {
                            this.add_assets_drawer = true;
                        }
                    } else {
                        this.$message({
                            type: 'warning',
                            message: "没有获取到资产类型列表"
                        });
                    }
                });
            } else {
                this.add_assets_drawer = true;
            }
        },
        add_assets() {
            this.$refs['add_assets_data'].validate((valid) => {
                if (valid) {
                    this.loading = true;
                    add_asset({
                        'name': this.add_assets_data.name,
                        'type': this.add_assets_data.type,
                        'label': this.add_assets_data.label,
                        'additionalInfo': {
                            'description': this.add_assets_data.description
                        }
                    }).then((res) => {
                        if (res.success) {
                            this.search_assets();
                            this.add_assets_drawer = false;
                        } else {
                            this.$message({
                                type: 'info',
                                message: res.message
                            });
                            this.loading = false;
                        }
                    })
                } else {
                    this.loading = false;
                    this.$message({
                        type: 'info',
                        message: '请填写必填项'
                    });
                }
            })
        },
        distribution_button(id) {
            search_client(this.search_form).then(res => {
                if (res.success) {
                    this.customer_list = res.data;
                    this.assets_distribution_data.assets_id = id;
                    this.assets_distribution_drawer = true;
                } else {
                    this.$message({
                        type: 'info',
                        message: res.message
                    });
                }
            })
        },
        distribution_assets() {
            dis_asset({
                "assetsId": this.assets_distribution_data.assets_id,
                "customerId": this.assets_distribution_data.customer_id
            }).then(res => {
                if (res.success) {
                    this.$message({
                        type: 'success',
                        message: '资产分配成功'
                    });
                    this.search_assets()
                } else {
                    this.$message({
                        type: 'info',
                        message: '资产分配失败'
                    });
                }
            })
        },
        del_distribution(id) {
            delDis_asset({
                "assetsId": id
            }).then(res => {
                if (res.success) {
                    this.$message({
                        type: 'success',
                        message: '操作成功'
                    });
                    this.search_assets()
                } else {
                    this.$message({
                        type: 'info',
                        message: res.message
                    });
                }
            })
        },
        update_button() {
            this.add_button(false);
            this.update_mode = true;
        },
        update_info() {
            this.loading = true;
            this.$refs['update_data'].validate((valid) => {
                if (valid) {
                    update_asset(this.update_data).then((res) => {
                        if (res.success) {
                            this.$message({
                                type: 'info',
                                message: res.message
                            });
                            let data = res.data;
                            let ati = data.additionalInfo;
                            this.update_tenant_admin_data = data;
                            this.show_table_data = [{
                                k: '名称',
                                v: data.name
                            }, {
                                k: '类型',
                                v: data.type
                            }, {
                                k: '标签',
                                v: data.label
                            }, {
                                k: '说明',
                                v: ati ? ati.description : null
                            }];
                            this.update_mode = false;
                        } else {
                            this.$message({
                                type: 'info',
                                message: res.message
                            });
                        }
                        this.loading = false;
                    })
                } else {
                    return false;
                }
            })
        },
        public_asset(id) {
            public_asset({
                "assetId": id
            }).then(res => {
                if (res.success) {
                    this.$message({
                        type: 'success',
                        message: '资产已公开'
                    });
                    this.search_assets()
                } else {
                    this.$message({
                        type: 'info',
                        message: res.message
                    });
                }
            })
        }
    },
    created() {
        let id = '';
        let user = this.$store.state.user.user;
        if (user.authority === 'CUSTOMER_USER') {
            id = user.customerId.id;
            this.isCustomer = true
        } else {
            this.isCustomer = false;
            let url = window.location.href;
            let number = url.lastIndexOf("customerId=");
            if (number > 0) {
                id = url.substr(number + 11);
            }
        }

        this.customer_id = id;
        this.search_form.id = id;
        this.assets_distribution_data.customer_id = id;
        this.search_assets()
    }
}
</script>

<style scoped>
.hide {
    display: none !important;
}

.menuItem {
    margin-left: .2rem;
    margin-right: .2rem;
}
</style>
