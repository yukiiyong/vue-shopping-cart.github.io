new Vue({
	el:".container",
	data:{
		addressList:[],
		currentIndex: 0,
		shippingMethod:1,
		filterCount:3,
		showAddFlag:false,
		showDelFlag:false,
		delIndex:-1,
		newAddrItem:{},
	},
	mounted:function(){
		this.$nextTick(function(){
			this.getAddressList();
		})
	},
	computed:{
		filterAddressList:function(){
			return this.addressList.slice(0,this.filterCount);
		}
	},
	methods:{
		getAddressList:function(){
			axios.get("static/data/address.json",{"id":123}).then(res=>{
				this.addressList=res.data.result;
			})
		},
		setDefault:function(addressId){
			this.addressList.forEach(item=>{
				if(item.addressId == addressId){
					item.isDefault = true;
				}else{
					item.isDefault = false;
				}
			})
		},
		showDelModal:function(index){
			console.log(index)
			this.showDelFlag=true;
			this.delIndex=index;
		},
		deleteAddress:function(){
			if(this.delIndex > -1){
				this.addressList.splice(this.delIndex,1);
				this.showDelFlag=false;
			}
			
		},
		showMd: function(id,flag,item){
			this.showAddFlag=flag;
			if(id =="showModalw"){
				this.newAddrItem=item;
			}	
			/*if(id =="showModalw"){
				document.querySelector("#newName").value=item.userName;
				document.querySelector("#newAddress").value=item.streetName;
				document.querySelector("#newTel").value=item.tel;
			}*/			
		},
		saveAddr(AddrItem){
			if(AddrItem.addressId && AddrItem.addressId != 'undefined'){
				this.addressList.forEach(item =>{
					if(item.addressId == AddrItem.addressId){
						item.userName=AddrItem.userName;
						item.streetName=AddrItem.streetName,
						item.tel=AddrItem.tel
					}
				})		
			}else{
				this.addressList.push({
					'userName':AddrItem.userName,
					'streetName':AddrItem.streetName,
					'tel':AddrItem.tel
				});

				
			}
			
			this.showAddFlag=false;
		}
	}
})