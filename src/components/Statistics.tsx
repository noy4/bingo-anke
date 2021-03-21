import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setDoneDialog } from '../features/system/systemSlice'
import API, { graphqlOperation } from '@aws-amplify/api'
import { listPostsSortedByBingoCountAndScore } from '../graphql/queries'
import { CreatePostInput } from '../API'
import { Grid } from '@material-ui/core'
const Plotly = require('plotly.js-dist')

interface StatisticsItem {
    [key: string]: {
        [key: string]: (string | number)[]
    }
}

const Statistics = () => {
    const dispatch = useDispatch()
    const [ex, setEx] = useState<StatisticsItem>({})
    const [ev, setEv] = useState<StatisticsItem>({})
    const [plotField, setPlotField] = useState([])

    const getPosts = async () => {
        const res = await API.graphql(
            graphqlOperation(listPostsSortedByBingoCountAndScore, {
                type: 'post',
                limit: 200,
            })
        )
        const experiment: StatisticsItem = {
            a1: {},
            a2: {},
            a3: {},
            b1: {},
            b2: {},
            b3: {},
        }
        const evaluation: StatisticsItem = {
            a1: {},
            a2: {},
            a3: {},
            b1: {},
            b2: {},
            b3: {},
        }

        res.data.listPostsSortedByBingoCountAndScore.items.forEach(
            (post: CreatePostInput) => {
                const contents = JSON.parse(post.contents)
                let itemKey = ''
                switch (post.group) {
                    case '/a-1':
                        itemKey = 'a1'
                        break
                    case '/a-2':
                        itemKey = 'a2'
                        break
                    case '/a-3':
                        itemKey = 'a3'
                        break
                    case '/b-1':
                        itemKey = 'b1'
                        break
                    case '/b-2':
                        itemKey = 'b2'
                        break
                    case '/b-3':
                        itemKey = 'b3'
                        break

                    default:
                        break
                }
                for (const key of Object.keys(contents.experiment)) {
                    experiment[itemKey] = experiment[itemKey] || {}
                    experiment[itemKey][key] = experiment[itemKey][key] || []
                    experiment[itemKey][key].push(contents.experiment[key])
                }
                for (const key of Object.keys(contents.evaluation)) {
                    evaluation[itemKey] = evaluation[itemKey] || {}
                    evaluation[itemKey][key] = evaluation[itemKey][key] || []
                    evaluation[itemKey][key].push(contents.evaluation[key])
                }
                // for (const key in contents.evaluation) {
                //     evaluation[itemKey][key].push(contents.evaluation[key])
                // }
            }
        )

        setEx(experiment)
        plotEvA(evaluation)
        plotEvB(evaluation)
        plotExA(experiment)
        plotExA_yen(experiment)
        plotExA_mon(experiment)
        plotExA_fun(experiment)
        plotExB(experiment)
        plotRankA(evaluation)
        plotRankB(evaluation)
    }

    // const x = ['Q5', 'Q6', 'Q7', 'Q8', 'Q9']
    const qArray = [...Array(8)].map((v, i) => 'Q' + (i + 1))
    const x = qArray.reduce((acc, value) => {
        const a = [...Array(11)].map(() => value as never)
        return [...acc, ...a]
    }, [])
    const exA_qArray = [...Array(5)].map((v, i) => 'Q' + (i + 5))
    const exA_x = exA_qArray.reduce((acc, value) => {
        const a = [...Array(11)].map(() => value as never)
        return [...acc, ...a]
    }, [])
    const exB_qArray = [...Array(9)].map((v, i) => 'Q' + (i + 5))
    const exB_x = exB_qArray.reduce((acc, value) => {
        const a = [...Array(11)].map(() => value as never)
        return [...acc, ...a]
    }, [])

    const plotRankA = (evaluation: any) => {
        const a2 = qArray.reduce(
            (acc: any, key) => [...acc, ...evaluation.a2[key], null],
            []
        )
        const a3 = qArray.reduce(
            (acc: any, key) => [...acc, ...evaluation.a3[key], null],
            []
        )

        const trace1 = {
            y: a2,
            x,
            name: 'A2',
            marker: { color: '#4284f4' },
            type: 'box',
        }
        const trace3 = {
            y: a3,
            x,
            name: 'A3',
            marker: { color: '#db4537' },
            type: 'box',
        }
        const data = [trace1, trace3]
        const layout = {
            title: 'A 評価アンケート',
            boxmode: 'group',
        }
        Plotly.newPlot('ev_A1-3_rank', data, layout)
    }
    const plotRankB = (evaluation: any) => {
        const b2 = qArray.reduce(
            (acc: any, key) => [...acc, ...evaluation.b2[key], null],
            []
        )
        const b3 = qArray.reduce(
            (acc: any, key) => [...acc, ...evaluation.b3[key], null, null],
            []
        )

        const trace1 = {
            y: b2,
            x,
            name: 'B2',
            marker: { color: '#4284f4' },
            type: 'box',
        }
        const trace3 = {
            y: b3,
            x,
            name: 'B3',
            marker: { color: '#db4537' },
            type: 'box',
        }
        const data = [trace1, trace3]
        const layout = {
            title: 'B 評価アンケート',
            boxmode: 'group',
        }
        Plotly.newPlot('ev_B1-3_rank', data, layout)
    }
    const plotExA = (experiment: any) => {
        const a1 = exA_qArray.reduce(
            (acc: any, key) => [...acc, ...experiment.a1[key]],
            []
        )
        const a3 = exA_qArray.reduce(
            (acc: any, key) => [...acc, ...experiment.a3[key], null],
            []
        )

        const trace1 = {
            y: a1,
            x: exA_x,
            name: 'A1',
            marker: { color: '#4284f4' },
            type: 'box',
        }
        const trace3 = {
            y: a3,
            x: exA_x,
            name: 'A3',
            marker: { color: '#db4537' },
            type: 'box',
        }
        const data = [trace1, trace3]
        const layout = {
            title: 'A 実験アンケート',
            boxmode: 'group',
        }
        Plotly.newPlot('ex_A1-3', data, layout)
    }
    const plotExA_yen = (experiment: any) => {
        const a1 = [...experiment.a1['Q10']]
        const a3 = [...experiment.a3['Q10'], null]

        const exA_x_yen = [...Array(11)].map(() => 'Q10')

        const trace1 = {
            y: a1,
            x: exA_x_yen,
            name: 'A1',
            marker: { color: '#4284f4' },
            type: 'box',
        }
        const trace3 = {
            y: a3,
            x: exA_x_yen,
            name: 'A3',
            marker: { color: '#db4537' },
            type: 'box',
        }
        const data = [trace1, trace3]
        const layout = {
            yaxis: {
                title: '円',
            },
            boxmode: 'group',
        }
        Plotly.newPlot('ex_A1-3_yen', data, layout)
    }
    const plotExA_mon = (experiment: any) => {
        const a1 = [...experiment.a1['Q11']]
        const a3 = [...experiment.a3['Q11'], null]

        const exA_x_mon = [...Array(11)].map(() => 'Q11')

        const trace1 = {
            y: a1,
            x: exA_x_mon,
            name: 'A1',
            marker: { color: '#4284f4' },
            type: 'box',
        }
        const trace3 = {
            y: a3,
            x: exA_x_mon,
            name: 'A3',
            marker: { color: '#db4537' },
            type: 'box',
        }
        const data = [trace1, trace3]
        const layout = {
            yaxis: {
                title: '問',
            },
            xaxis: {
                zeroline: true,
            },
            boxmode: 'group',
        }
        Plotly.newPlot('ex_A1-3_mon', data, layout)
    }
    const plotExA_fun = (experiment: any) => {
        const a1 = [...experiment.a1['Q12']]
        const a3 = [...experiment.a3['Q12'], null]

        const exA_x_fun = [...Array(11)].map(() => 'Q12')

        const trace1 = {
            y: a1,
            x: exA_x_fun,
            name: 'A1',
            marker: { color: '#4284f4' },
            type: 'box',
        }
        const trace3 = {
            y: a3,
            x: exA_x_fun,
            name: 'A3',
            marker: { color: '#db4537' },
            type: 'box',
        }
        const data = [trace1, trace3]
        const layout = {
            yaxis: {
                title: '分',
            },
            boxmode: 'group',
        }
        Plotly.newPlot('ex_A1-3_fun', data, layout)
    }
    const plotExB = (experiment: any) => {
        const b1 = exB_qArray.reduce(
            (acc: any, key) => [...acc, ...experiment.b1[key]],
            []
        )
        const b3 = exB_qArray.reduce(
            (acc: any, key) => [...acc, ...experiment.b3[key], null],
            []
        )

        const trace1 = {
            y: b1,
            x: exB_x,
            name: 'B1',
            marker: { color: '#4284f4' },
            type: 'box',
        }
        const trace3 = {
            y: b3,
            x: exB_x,
            name: 'B3',
            marker: { color: '#db4537' },
            type: 'box',
        }
        const data = [trace1, trace3]
        const layout = {
            title: 'B 実験アンケート',
            boxmode: 'group',
        }
        Plotly.newPlot('ex_B1-3', data, layout)
    }
    const plotEvB = (evaluation: any) => {
        const b1 = qArray.reduce(
            (acc: any, key) => [...acc, ...evaluation.b1[key]],
            []
        )
        const b3 = qArray.reduce(
            (acc: any, key) => [...acc, ...evaluation.b3[key], null, null],
            []
        )

        const trace1 = {
            y: b1,
            x,
            name: 'B1',
            marker: { color: '#4284f4' },
            type: 'box',
        }
        const trace3 = {
            y: b3,
            x,
            name: 'B3',
            marker: { color: '#db4537' },
            type: 'box',
        }
        const data = [trace1, trace3]
        const layout = {
            title: 'B 評価アンケート',
            boxmode: 'group',
        }
        Plotly.newPlot('ev_B1-3', data, layout)
    }
    const plotEvA = (evaluation: any) => {
        const a1 = qArray.reduce(
            (acc: any, key) => [...acc, ...evaluation.a1[key]],
            []
        )
        const a3 = qArray.reduce(
            (acc: any, key) => [...acc, ...evaluation.a3[key], null],
            []
        )

        const trace1 = {
            y: a1,
            x,
            name: 'A1',
            marker: { color: '#4284f4' },
            type: 'box',
        }
        const trace3 = {
            y: a3,
            x,
            name: 'A3',
            marker: { color: '#db4537' },
            type: 'box',
        }
        const data = [trace1, trace3]
        const layout = {
            title: 'A 評価アンケート',
            boxmode: 'group',
        }
        Plotly.newPlot('ev_A1-3', data, layout)
    }

    useEffect(() => {
        dispatch(setDoneDialog(false))
        getPosts()
    }, [dispatch])

    return (
        <Grid container direction="column">
            {/* {plotField} */}
            <Grid item xs={6}>
                <div id="ev_A1-3" style={{ height: '300px' }}></div>
            </Grid>
            <Grid item xs={6}>
                <div id="ev_B1-3" style={{ height: '300px' }}></div>
            </Grid>
            <Grid item xs={6}>
                <div id="ex_A1-3" style={{ height: '300px' }}></div>
            </Grid>
            <Grid item xs={3}>
                <div id="ex_A1-3_yen" style={{ height: '300px' }}></div>
            </Grid>
            <Grid item xs={3}>
                <div id="ex_A1-3_mon" style={{ height: '300px' }}></div>
            </Grid>
            <Grid item xs={3}>
                <div id="ex_A1-3_fun" style={{ height: '300px' }}></div>
            </Grid>
            <Grid item xs={6}>
                <div id="ex_B1-3" style={{ height: '300px' }}></div>
            </Grid>
            <Grid item xs={6}>
                <div id="ev_A1-3_rank" style={{ height: '300px' }}></div>
            </Grid>
            <Grid item xs={6}>
                <div id="ev_B1-3_rank" style={{ height: '300px' }}></div>
            </Grid>
        </Grid>
    )
}

export default Statistics
