<template>
	<div id="main">
			<div class="header">
					<h1>Welcome </h1>
			</div>
			<md-card class="you">
				<md-input-container>
					<label>name</label>
					<md-input @keyup.enter.native="getAll" v-model="name"></md-input>
				</md-input-container>
			<md-input-container>
				<label>Token</label>
				<md-input @keyup.enter.native="getAll" v-model="token"></md-input>
			</md-input-container>
			<label>Select Time</label>
			<input type="date" v-model="datePicker" @keyup.enter.native="getAll" ></input>
		</md-card>
		
		<div class="date">
			<span>{{ lastdate | datetime }} - {{ firstdate | datetime }}</span>
			<md-input-container>
				<label>Page</label>
				<md-input v-model="page" @keyup.enter.native="getAll"></md-input>
			</md-input-container>
		</div>
		<md-card class="my button">
			<md-button  @click.native="getAll" class="md-raised md-primary">Get</md-button>
			<md-button  @click.native="back" class="md-raised md-primary">back</md-button>
			<md-button  @click.native="next" class="md-raised md-primary">Next</md-button>
		</md-card>
			<div class="view" v-for="item in git">
				<md-card class="my">
				 <div class="view-item">
				 <b>{{ item.commit.author.date | datetime }} </b>
				 	<a  v-bind:href="item.html_url">Link</a>
				</div> 
				<div class="view-item main">
				{{ item.commit.message }}
				</div> 
				<div class="view-item">
				{{ item.commit.author.name }}
				</div> 
				</md-card>
			</div>
		</div>
</template>

<script>
import moment from 'moment'
export default {
	name: 'Main',
	data () {
		return {
			git: [],
			all: [],
			page: 1,
			count: '',
			name: '',
			token: '',
			datePicker: []
		}
	},
	computed: {
		firstdate () {
			if (this.git.length >= 1) {
				return this.git[0].commit.author.date
			}
			return ''
		},
		lastdate () {
			if (this.git.length >= 1) {
				const num = this.git.length - 1
				return this.git[num].commit.author.date
			}
			return ''
		},
	},
	mounted () {
		this.getTime()
		this.getAll()
	},
	methods: {
		getTime: function () {
			const datetimeFormat = 'YYYY-MM-DD'
			const date = new Date()
			this.datePicker.push(moment(date).format(datetimeFormat))
		},
		getAll: function () {
			const token = this.token
			const parm = 'commits?q=author:' + this.name + '+author-date:<' + this.datePicker + '&sort=author-date&page=' + this.page + '&per_page=20'
			const endpoint = 'https://api.github.com/search/' + encodeURI(parm)
			const myHeader = new Headers()
			// myHeader.append('Accept','application/vnd.github.v3.text-match+json');
			myHeader.append('Accept', 'application/vnd.github.cloak-preview')
			if (!this.token.length <= 0) {
				myHeader.append('Authorization', 'token ' + token)
			}
			const header = {
				method: 'GET',
				headers: myHeader,
				mode: 'cors',
				cache: 'default'
			}
			if (this.git.length >= 0) {
				this.git = []
				this.all = []
			}
			fetch(endpoint, header)
				.then(blob => blob.json())
				.then((data) => {
					this.all.push(data)
					this.count = this.all[0].total_count
					this.git.push(...data.items)
				})
		},
		next: function () {
			this.page <= 20 ? this.page ++ : ''
			this.getAll()
		},
		back: function () {
			this.page --
			this.getAll()
		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.header{
	display: flex;
	justify-content: center;
}
.my.button{
	display: flex;
	flex: 1;
}
.my.button button{
	display: flex;
	flex: 1;
}
.my.button div{
	flex: 1;
}

.md-card{
	 margin-bottom: 15px;
}
.md-card.my{
	margin-left: auto;
  margin-right: auto;
  width: 1024px;
  display: flex;
  flex: 1;
  flex-direction: row;
}
.you{
	margin-bottom: 80px;
}
.md-card.you{
	padding: 15px;
	margin-left: auto;
  margin-right: auto;
  width: 1024px;
}
.view-item{
	justify-content: center;
	align-items: center;
	flex-direction: column;
	min-height: 80px;
	font-size: 15px;
	margin: 10px 15px;
	height: 50px;
	display: flex;
	flex: 1;
}
.view-item.main{
	flex: 4;
}
.date{
	margin-bottom: 30px;
	width: 1024px;
	margin-left: auto;
	margin-right: auto;
	font-size: 35px;
	display: flex;
	align-items: center;
	justify-content: space-between;
}
.date span b{
	
}
.date div{
	display: flex;
	width: 10%;
}
.date span{
	display: flex;
	width: 80%;
}
</style>
