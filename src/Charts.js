import React, { Component } from 'react';

import * as IssuesAPI from './utils/IssuesAPI';

import $ from 'jquery';
// echarts
import echarts from 'echarts';
import roma from 'echarts/theme/roma';
// 引入柱状图
import 'echarts/lib/chart/bar';
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';

class Charts extends Component {

    componentDidMount() {
        var usersChart = echarts.init(document.getElementById("usersChart"), roma);
        var labelsChart = echarts.init(document.getElementById("labelsChart"), roma);
        var timelineChart = echarts.init(document.getElementById("timelineChart"), roma);


        // console.log(usersChart, labelsChart, timelineChart);


        this.allTasks({
                usersChart,
                labelsChart,
                timelineChart
            }, 6, this.props.gh, (issuesArr) => {
            // 转为人为对象
            let peopleArr = this.arrToPeople(issuesArr);
            // 转为标签为对象
            let labelArr = this.arrToLabel(issuesArr);
            // core data
            $("#active-user").text(peopleArr.length || 0);
            $("#all-issues").text(issuesArr.length || 0);
            let allIssues = {
                open: 0,
                closed: 0
            }
            for (const item of issuesArr) {
                item.state === 'open' ?
                    allIssues.open++ :
                    allIssues.closed++;
            }
            $("#fixed-issues").text(allIssues.closed);
            $("#open-issues").text(allIssues.open);
            this.loadUsersChart(usersChart, peopleArr);
            this.loadLabelsChart(labelsChart, labelArr);
            this.loadDaysChart(timelineChart, issuesArr);
        });

        window.onresize = function () {
            usersChart.resize();
            labelsChart.resize();
            timelineChart.resize();
        };
    }

    /**
     * 任务
     */
    task = (num, repo) => {
        return new Promise((resolve, reject) => {
            $.ajax({
            type: "get",
            url: `https://api.github.com/repos/${repo}/issues`,
            data: {
                "state": "all",
                "page": num,
                "per_page": 100,
                "since": "2018-08-01T08:00:00Z"
            },
            success: function (res) {
                resolve(res);
            },
            error: function (e) {
                reject(e);
            }
            });
        });
    }

    allTasks = async ({usersChart, labelsChart, timelineChart}, num, repo, done) => {
        repo = repo.split("https://github.com/")[1];
        usersChart.showLoading();
        labelsChart.showLoading();
        timelineChart.showLoading();
        let issuesArr = [];
        for (let i = 1; i <= num; i++) {
            let res = await this.task(i, repo);
            if (res.length > 0) {
            console.log(res);
            issuesArr = issuesArr.concat(res);
            } else {
            usersChart.hideLoading();
            labelsChart.hideLoading();
            timelineChart.hideLoading();
            console.log(issuesArr);
            done(issuesArr);
            return;
            }
        }
    }

    /**
     * 数组转化（按人分）
     *
     * @param {arr} array
     * @returns
     */
    arrToPeople = (array) => {
        var arr = array;
        var map = [],
            users = [];
        for (let i = 0; i < arr.length; i++) {
            let issue = arr[i];
            if (!map[issue.user.id]) {
                map[issue.user.id] = {
                    name: issue.user.login,
                    all: 1,
                    issues: []
                }
            } else {
                let user = map[issue.user.id];
                user.all++;
            }
            map[issue.user.id].issues.push(issue);
        }

        for (const index in map) {
            users.push(map[index])
        }

        console.log(users);

        return users
    }

    /**
     * 数组转化（按标签分）
     *
     * @param {arr} array
     * @returns
     */
    arrToLabel = (array) => {
        var arr = array;
        var dest = [],
            labelArr = [];
        for (let i = 0; i < arr.length; i++) {
            var issue = arr[i];
            for (let j = 0; j < issue.labels.length; j++) {
                const label = issue.labels[j];
                if (!dest[label.id]) {
                    dest[label.id] = {
                        value: 1,
                        name: label.name,
                    }
                } else {
                    dest[label.id].value++;
                }
            }
        }

        for (const index in dest) {
            labelArr.push(dest[index])
        }

        return labelArr
    }

    //转换时间
    transDate = (n) => {
        var date = new Date(n);
        var Y = date.getFullYear() + '-';
        var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
        var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
        return (Y + M + D)
    }

    //返回所需数据格式
    mapIssue = (arr) =>{
        let newArr = [];
        arr.forEach((issue, i) => {
            let index = -1;
            let alreadyExists = newArr.some((newIssue, j) => {
            if (issue.created_at === newIssue.time) {
                index = j;
                return true;
            }
            });
            if (!alreadyExists) {
            newArr.push({
                time: issue.created_at,
                issues: [issue]
            });
            } else {
            newArr[index].issues.push(issue);
            }
        });
        return newArr;
    };

    loadUsersChart = (usersChart, peopleArr) => {
        peopleArr.sort((a, b) => b.all - a.all);
        var nameArr = peopleArr.map(item => item.name);
        var allArr = peopleArr.map(item => item.all);

        var app = {};
        var option = null;
        option = {
            backgroundColor: 'transparent',
            tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
            },
            xAxis: [{
            type: 'category',
            data: nameArr,
            name: '昵称',
            nameTextStyle: {
                color: '#fff'
            },
            axisTick: {
                alignWithLabel: true
            },
            axisLine: {
                lineStyle: {
                    color: "rgba(255,255,255,0.75)"
                }
            },
            axisLabel: {
                interval: 0,
                rotate: 40,
                show: true,
                splitNumber: 15,
                textStyle: {
                fontSize: 10,
                },
                "textStyle": {
                    "color": "rgba(255,255,255,0.75)"
                }
            },
            }],
            yAxis: [{
            type: 'value',
            name: '个数',
            nameTextStyle: {
                color: '#fff'
            },
            axisLine: {
                lineStyle: {
                    color: "rgba(255,255,255,0.75)"
                }
            },
            }],
            series: [{
            name: 'issue',
            type: 'bar',
            stack: '总量',
            barWidth: '50%',
            data: allArr,
            label: {
                normal: {
                show: true,
                position: 'top',
                textStyle: {
                    color: "#fff"
                }
                }
            },
            itemStyle: {
                normal: {
                color: 'rgba(255,255,255,0.8)'
                }
            },
            }]
        };
        if (option && typeof option === "object") {
            usersChart.setOption(option, true);
        }
    }

    loadLabelsChart = (labelsChart, labelArr) => {
        labelArr.sort((a, b) => b.value - a.value);
        var nameArr = labelArr.map(item => item.name);

        console.log(labelArr);

        var app = {};
        var option = null;
        option = {
            backgroundColor: 'transparent',
            tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
            },
            xAxis: [{
            type: 'category',
            data: nameArr,
            name: "标签",
            nameTextStyle: {
                color: '#fff'
            },
            axisLine: {
                lineStyle: {
                    color: "rgba(255,255,255,0.75)"
                }
            },
            axisTick: {
                alignWithLabel: true
            },
            axisLabel: {
                interval: 0,
                rotate: 40,
                show: true,
                splitNumber: 15,
                textStyle: {
                fontSize: 10,
                },
            },
            }],
            grid: {
                x: 40,
                x2: 100,
                y2: 100,
            },
            yAxis: [{
            type: 'value',
            name: "个数",
            nameTextStyle: {
                color: '#fff'
            },
            axisLine: {
                lineStyle: {
                    color: "rgba(255,255,255,0.75)"
                }
            },
            }],
            series: [{
            name: 'issue',
            type: 'bar',
            stack: '总量',
            barWidth: '50%',
            data: labelArr,
            label: {
                normal: {
                show: true,
                position: 'top',
                textStyle: {
                    color: "#fff"
                }
                }
            },
            itemStyle: {
                normal: {
                color: 'rgba(255,255,255,0.8)'
                }
            },
            }]
        };
        if (option && typeof option === "object") {
            labelsChart.setOption(option, true);
        }
    }

    loadDaysChart = (timelineChart, res) => {

        let daysArr = res.map(issue => {
            let tempIssue = issue;
            tempIssue.created_at = this.transDate(IssuesAPI.getTimeStamp(issue.created_at) + 8 * 60 * 60 * 1000);
            return tempIssue;
        });
        console.log(daysArr);
        daysArr = this.mapIssue(daysArr);
        daysArr.sort((a, b) => a.time.localeCompare(b.time));
        console.log(daysArr);

        var xData = function () {
            var data = [];
            for (var i = 0; i < daysArr.length; i++) {
            data.push(daysArr[i].time.slice(5));
            }
            console.log(data);

            return data;
        }();

        var option = null;
        option = {
            backgroundColor: "transparent",
            "grid": {
            "borderWidth": 0,
            "top": 50,
            "bottom": 95,
            textStyle: {
                color: "#fff"
            }
            },
            "calculable": true,
            "xAxis": [{
            "type": "category",
            "splitLine": {
                "show": false
            },
            axisLine: {
                lineStyle: {
                    color: "rgba(255,255,255,0.75)"
                }
            },
            "axisTick": {
                "show": false
            },
            "splitArea": {
                "show": false
            },
            "axisLabel": {
                "interval": 0,
                rotate: 40,
            },
            grid: {
                x: 40,
                x2: 100,
                y2: 100,
            },
            "data": xData,
            }],
            "yAxis": [{
            "type": "value",
            "splitLine": {
                "show": false
            },
            axisLine: {
                lineStyle: {
                    color: "rgba(255,255,255,0.75)"
                }
            },
            "axisTick": {
                "show": false
            },
            "axisLabel": {
                "interval": 0,

            },
            "splitArea": {
                "show": false
            },

            }],
            "dataZoom": [{
            "show": true,
            "height": 30,
            "xAxisIndex": [
                0
            ],
            bottom: 30,
            // "start": 10,
            // "end": 80,
            handleIcon: 'path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z',
            handleSize: '110%',
            handleStyle: {
                color: "#d3dee5",

            },
            textStyle: {
                color: "#fff"
            },
            borderColor: "#90979c"
            }, {
            "type": "inside",
            "show": true,
            "height": 15,
            "start": 1,
            "end": 35
            }],
            "series": [{
            "name": "issue",
            "type": "bar",
            "stack": "总量",
            "barMaxWidth": 35,
            "barGap": "10%",
            "itemStyle": {
                "normal": {
                "color": "rgba(255,255,255,.6)",
                }
            },
            "data": daysArr.map(day => day.issues.length),
            }, {
            "name": "总数",
            "type": "line",
            // "stack": "总量",
            symbolSize: 10,
            symbol: 'circle',
            "itemStyle": {
                "normal": {
                "color": "rgba(255,255,255,1)",
                "barBorderRadius": 0,
                "label": {
                    "show": true,
                    "position": "top",
                    formatter: function (p) {
                    return p.value > 0 ? (p.value) : '';
                    }
                }
                }
            },
            "data": daysArr.map(day => day.issues.length)
            }, ]
        }

        if (option && typeof option === "object") {
            timelineChart.setOption(option, true);
        }
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-12">
                <div className="card card-chart">
                    <div className="card-header card-header-success">
                    <div className="ct-chart" id="usersChart" style={{height: '100%', minHeight: '200px'}}></div>
                    </div>
                    <div className="card-body">
                    </div>
                    <div className="card-footer">
                    <h4 className="card-title">Issue 分布</h4>
                    </div>
                </div>
                </div>
                <div className="col-md-12">
                <div className="card card-chart">
                    <div className="card-header card-header-info">
                    <div className="ct-chart" id="labelsChart" style={{height: '100%', minHeight: '300px'}}></div>
                    </div>
                    <div className="card-body">
                    </div>
                    <div className="card-footer">
                    <h4 className="card-title">Label 分布</h4>
                    </div>
                </div>
                </div>
                <div className="col-md-12">
                <div className="card card-chart">
                    <div className="card-header card-header-danger">
                    <div className="ct-chart" id="timelineChart" style={{height: '100%', minHeight: '400px'}}></div>
                    </div>
                    <div className="card-body">
                    
                    </div>
                    <div className="card-footer">
                    <h4 className="card-title">Timeline</h4>
                    </div>
                </div>
                </div>
            </div>
        )
    }
}

export default Charts