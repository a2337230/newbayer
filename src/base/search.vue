<template>
	<div>
		<div class="input-con">
			<input type="text" name="" v-model="val" class="seach-input"  autocomplete="off" :class="{'hasInput':focusInput||val}" @focus="focusInput=true"
			 @blur="focusInput=false">
			<p class="bg-img" :class="{'hasVal':focusInput||val}" @click.stop="upInput">
				<span class="seach-btn" v-if='!val'></span>
				<span class="text" v-if='!val'>{{placeholder}}</span>
			</p>
            <img :src="require('../assets/del.png')" alt="" class="del click-btn" v-if="val" @click="delVal">
		</div>
	</div>
</template>

<script>
	export default {
		props: {
			placeholder: {
				type: String,
				default: "搜索课程"
			}
		},
		data() {
			return {
				val: '',
				focusInput: false
			}
		},
		methods: {
			upInput(){
				$('.seach-input').focus()
			},
			delVal(){
				this.val = '';
				this.$emit('clearVal')
			}
		},
		watch: {
			val(newVal) {
				this.$emit('valChange', newVal);
			}
		}
	}
</script>

<style lang="scss" scoped="scoped">
	.del{
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		width: 0.3rem;
		height: 0.3rem;
		right: 0.3rem;
	}
	.input-con .seach-btn {
        margin-right:0.14rem;
	}

	.bg-img {
		// width: 200px;
		justify-content: center;
		transition: all .3s;
		display: flex;
		align-items: center;
		position: absolute;
		white-space:nowrap;
		z-index: 11;
		left: 50%;
		transform: translatex(-50%);
		&.hasVal {
			transform: translatex(0);
			left: 0.2rem;
		}
	}

	.text {
		text-align: center;
	    font-size: 14px;
		color: #BBBBBB;
		display: inline-block;
		min-width: 100px;
	}
    .hasVal .text{
		text-align: left;
	}
	.input-con {
		display: flex;
		align-items: center;
		position: relative;

		// padding: 0.14rem 0;
		.seach-input {
			outline: none;
			 -webkit-appearance: none;
			// z-index: 12;
			transition: all 0.4s;
			width: 6.78rem;
			height: 0.6rem;
			font-size: 0.22rem;
			color: #8e8e93;
			border: 1px solid #ededed;
			border-radius: 0.26rem;
			margin: 0 auto;
			padding-left: 0.12rem;
			background: #f9f9f9;

			&::-webkit-input-placeholder {
				text-align: center;
			}

			&.hasInput {
				padding-left: 0.5rem;
				border: 1px solid #2F54EB;
				color: #333;
				font-size: .26rem;
			}
		}

		.seach-btn {
			font-size: 0;
			width: 0.34rem;
			height: 0.32rem;
			background: url('../assets/search.png');
			background-repeat: no-repeat;
			background-size: 0.34rem 0.32rem;
			display: inline-block;
		}
	}
</style>
