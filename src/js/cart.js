Vue.prototype.$http=axios;
var vm=new Vue({
	el:"#app",
	data:{
		productList:[],
		totalMoney:0,
		checkAllFlag:false,
		checkedCount:0,
		showDelFlag:false,
		delIndex:-1,
	},
	mounted:function(){
		this.initView();
		// this.$nextTick(function(){
		// 	this.initView();
		// })
	},
	computed:{
		totalMoneyByComputed:function(){
			var totalMoney=0;
			this.productList.forEach(item=>{
				if(item.checked){
					totalMoney +=item.price *item.count;
				}
			})
			return totalMoney;
		}
	},
	watch:{
		productList:{
			handler:function(){
				this.totalMoney =0;
				this.checkedCount=0;
				this.productList.forEach(item=>{
					if(item.checked){
						this.totalMoney+=item.price *item.count;
						this.checkedCount++;
					}
					if(this.checkedCount == this.productList.length){
						this.checkAllFlag =true;
					}else{
						this.checkAllFlag=false;
					}
				})
			},
			deep:true
		}
	},
	filters:{
		formatMoney(value,type){
			if(!type){
				type='';
			}
			return "￥"+value.toFixed(2)+type;
		}
	},
	methods:{
		initView:function(){
			axios.get("static/data/cart.json",{"id":123}).then(res=>{
				this.productList=res.data.result.list;
				this.totalMoney=res.data.result.totalMoney;
			});
		},
		changeCount:function(item,count){
			item.count+=count;
			if(item.count<=0){
				item.count=1;
			}
		},
		selectProduct:function(item){
			if(typeof item.checked =='undefined'){
				this.$set(item,"checked",true);
			}else{
				item.checked =!item.checked;
			}
		},
		checkAll:function(flag){
			this.checkAllFlag =flag;
			this.productList.forEach(item=>{
				if(typeof item.checked =='undefined'){
					this.$set(item,'checked',this.checkAllFlag);
				}else{
					item.checked=this.checkAllFlag;
				}
			})
		},
		showDelModal:function(index){
			console.log(index)
			this.showDelFlag=true;
			this.delIndex=index;
		},
		deleteItem:function(){
			if(this.delIndex > -1){
				this.productList.splice(this.delIndex,1);
				this.showDelFlag=false;
			}
			
		},
	}
});