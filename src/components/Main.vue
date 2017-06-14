<template>
	<div id="main">
			<md-card class="my">
				<md-button  @click.native="getAll" class="md-raised md-primary">Get</md-button>
				<md-button  @click.native="next" class="md-raised md-primary">Next</md-button>
				<md-button  @click.native="back" class="md-raised md-primary">back</md-button>
				<md-input-container>
					<label>Page</label>
					<md-input v-model="page"></md-input>
				</md-input-container>
			</md-card>
			<md-card class="you">
				<md-input-container>
					<label>name</label>
					<md-input v-model="name"></md-input>
				</md-input-container>
			<md-input-container>
				<label>Token</label>
				<md-input v-model="token"></md-input>
			</md-input-container>
			<label>Select Time</label>
			<input type="date" v-model="datePicker"></input>
		</md-card>
		<div class="date">
			<span>Date: {{ firstdate | datetime }} - {{ lastdate | datetime }}</span>
		</div>
			<div class="view" v-for="item in git">
				<md-card class="my">
				 <div class="view-item">
				 {{ item.commit.author.date | datetime }} 
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
			page: 1,
			name: '',
			token: '',
			datePicker: []
		}
	},
	watch: {
		datePicker: 'getAll',
		page: 'getAll'
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
	},
	methods: {
		getTime: function () {
			const datetimeFormat = 'YYYY-MM-DD'
			const date = new Date()
			this.datePicker.push(moment(date).format(datetimeFormat))
		},
		getAll: function () {
			const token = '16e55270fb3c5141f3cf140d6b0247f072e28567'
			const parm = 'commits?q=author:AndreEtienne+author-date:<' + this.datePicker + '&sort=author-date&page=' + this.page + '&per_page=20'
			const endpoint = 'https://api.github.com/search/' + encodeURI(parm)
			const myHeader = new Headers()
			// myHeader.append('Accept','application/vnd.github.v3.text-match+json');
			myHeader.append('Accept', 'application/vnd.github.cloak-preview')
			myHeader.append('Authorization', 'token ' + token)
			const header = {
				method: 'GET',
				headers: myHeader,
				mode: 'cors',
				cache: 'default'
			}
			if (this.git.length >= 0) {
				this.git = []
			}
			fetch(endpoint, header)
				.then(blob => blob.json())
				.then(data => this.git.push(...data.items))
		},
		next: function () {
			this.page ++
		},
		back: function () {
			this.page --
		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
.md-card.you{
	padding: 15px;
	margin-left: auto;
  margin-right: auto;
  width: 1024px;
}
.view-item{
	justify-content: center;
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
	margin: 20px 0px;
	font-size: 35px;
	display: flex;
	justify-content: center;
}
</style>
