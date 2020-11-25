/* eslint-disable react/display-name */
import React, { forwardRef, useEffect, useState } from 'react'
import API, { graphqlOperation } from '@aws-amplify/api'
import { Box } from '@material-ui/core'
import { useDispatch } from 'react-redux'
import { setDoneDialog } from '../features/system/systemSlice'
import { listPostsSortedByBingoCountAndScore } from '../graphql/queries'
import moment from 'moment'
import _ from 'lodash'
import MaterialTable from 'material-table'
import {
    AddBox,
    Check,
    Clear,
    DeleteOutline,
    ChevronRight,
    Edit,
    SaveAlt,
    FilterList,
    FirstPage,
    LastPage,
    ChevronLeft,
    Search,
    ArrowDownward,
    Remove,
    ViewColumn,
} from '@material-ui/icons'
import { CreatePostInput } from '../API'
import { questionsA } from '../app/questions/questionsA'
import { questionsB } from '../app/questions/questionsB'
import { evaluationQuestions } from '../app/questions/evaluationQuestions'
import { FIVE_POINT, GROUP, Question } from '../app/const'
import { bonusQuestions } from '../app/questions/bonusQuestions'

const formatTime = (time: number) => {
    return moment(time).subtract(9, 'h').format('H:mm:ss')
}

const Analytics = () => {
    const dispatch = useDispatch()
    const [posts, setPosts] = useState([])

    const getTitle = (type: string, id: number) => {
        let questions: Question[] = questionsA
        switch (type) {
            case 'A':
                questions = questionsA
                break
            case 'B':
                questions = questionsB
                break
            case 'ev':
                questions = evaluationQuestions
                break
            case 'bo':
                questions = bonusQuestions
                break

            default:
                break
        }
        const q = questions.find((v) => v.id === 'Q' + id)
        return (
            `${type}-Q${id}. ${q?.title}` +
            (q?.negative ? `(${q.negative}, ${q.positive})` : '')
        )
    }
    const cell = (minWidth: number) => {
        return {
            cellStyle: {
                minWidth,
            },
        }
    }
    const getQuestions = (type: string) => {
        let count = 0
        let offset = 0
        switch (type) {
            case 'A':
            case 'B':
                count = 11
                offset = 5
                break
            case 'ev':
                count = 11
                offset = 1
                break
            case 'bo':
                count = 7
                offset = 1
                break

            default:
                break
        }
        return [...Array(count)].map((_, i) => {
            return {
                title: getTitle(type, i + offset),
                field: `${type}-Q${i + offset}`,
                ...cell(300),
            }
        })
    }
    const columns = [
        {
            title: 'グループ',
            field: 'group',
            ...cell(150),
        },
        {
            title: '名前',
            field: 'name',
            render: (rowData: any) => {
                return rowData.familyName + (rowData.firstName || '')
            },
            ...cell(100),
        },
        { title: '公開名', field: 'displayName', ...cell(150) },
        { title: '所属', field: 'from', ...cell(100) },
        {
            title: '性別',
            field: 'sex',
            lookup: { male: '男', female: '女', other: 'その他' },
            ...cell(100),
        },
        {
            title: 'ビンゴ数',
            field: 'bingoCount',
            type: 'numeric' as const,
            ...cell(150),
        },
        {
            title: 'スコア',
            field: 'score',
            type: 'numeric' as const,
            ...cell(150),
        },
        {
            title: '未使用ガラポン',
            field: 'unusedGalapons',
            ...cell(150),
        },
        {
            title: '実験開始時刻',
            field: 'experimentTime',
            defaultSort: 'desc' as const,
            type: 'numeric' as const,
            render: (rowData: any) =>
                moment(rowData.startTime).format('MM/DD HH:mm'),
            ...cell(150),
            customSort: (a: any, b: any) => a.startTime - b.startTime,
        },
        {
            title: '実験時間',
            field: 'experimentTime',
            type: 'numeric' as const,
            render: (rowData: any) =>
                formatTime(
                    Number(rowData.experimentEndTime) -
                        Number(rowData.startTime)
                ),
            ...cell(150),
            customSort: (a: any, b: any) =>
                a.experimentEndTime -
                a.startTime -
                (b.experimentEndTime - b.startTime),
        },
        {
            title: '評価時間',
            field: 'evaluationTime',
            type: 'numeric' as const,
            render: (rowData: any) => {
                const time =
                    Number(rowData.evaluationEndTime) -
                    Number(rowData.experimentEndTime)
                return formatTime(time < 0 ? 0 : time)
            },
            ...cell(150),
            customSort: (a: any, b: any) =>
                a.evaluationEndTime -
                a.experimentEndTime -
                (b.evaluationEndTime - b.experimentEndTime),
        },
        ...getQuestions('A'),
        ...getQuestions('B'),
        ...getQuestions('ev'),
        ...getQuestions('bo'),
    ]
    const tableIcons = {
        Add: forwardRef<SVGSVGElement>((props, ref) => (
            <AddBox {...props} ref={ref} />
        )),
        Check: forwardRef<SVGSVGElement>((props, ref) => (
            <Check {...props} ref={ref} />
        )),
        Clear: forwardRef<SVGSVGElement>((props, ref) => (
            <Clear {...props} ref={ref} />
        )),
        Delete: forwardRef<SVGSVGElement>((props, ref) => (
            <DeleteOutline {...props} ref={ref} />
        )),
        DetailPanel: forwardRef<SVGSVGElement>((props, ref) => (
            <ChevronRight {...props} ref={ref} />
        )),
        Edit: forwardRef<SVGSVGElement>((props, ref) => (
            <Edit {...props} ref={ref} />
        )),
        Export: forwardRef<SVGSVGElement>((props, ref) => (
            <SaveAlt {...props} ref={ref} />
        )),
        Filter: forwardRef<SVGSVGElement>((props, ref) => (
            <FilterList {...props} ref={ref} />
        )),
        FirstPage: forwardRef<SVGSVGElement>((props, ref) => (
            <FirstPage {...props} ref={ref} />
        )),
        LastPage: forwardRef<SVGSVGElement>((props, ref) => (
            <LastPage {...props} ref={ref} />
        )),
        NextPage: forwardRef<SVGSVGElement>((props, ref) => (
            <ChevronRight {...props} ref={ref} />
        )),
        PreviousPage: forwardRef<SVGSVGElement>((props, ref) => (
            <ChevronLeft {...props} ref={ref} />
        )),
        ResetSearch: forwardRef<SVGSVGElement>((props, ref) => (
            <Clear {...props} ref={ref} />
        )),
        Search: forwardRef<SVGSVGElement>((props, ref) => (
            <Search {...props} ref={ref} />
        )),
        SortArrow: forwardRef<SVGSVGElement>((props, ref) => (
            <ArrowDownward {...props} ref={ref} />
        )),
        ThirdStateCheck: forwardRef<SVGSVGElement>((props, ref) => (
            <Remove {...props} ref={ref} />
        )),
        ViewColumn: forwardRef<SVGSVGElement>((props, ref) => (
            <ViewColumn {...props} ref={ref} />
        )),
    }

    const getPosts = async () => {
        const res = await API.graphql(
            graphqlOperation(listPostsSortedByBingoCountAndScore, {
                type: 'post',
                limit: 200,
            })
        )
        const newPosts = res.data.listPostsSortedByBingoCountAndScore.items.map(
            (post: CreatePostInput) => {
                const contents = JSON.parse(post.contents)
                const experiment = _.mapKeys(
                    contents.experiment,
                    (value, key) => {
                        if (['familyName', 'firstName', 'sex'].includes(key)) {
                            return key
                        } else {
                            return [GROUP.A1, GROUP.A2, GROUP.A3].includes(
                                String(post.group)
                            )
                                ? `A-${key}`
                                : `B-${key}`
                        }
                    }
                )
                const evaluation = _.mapKeys(
                    contents.evaluation,
                    (value, key) => `ev-${key}`
                )
                const bonus = _.mapKeys(
                    contents.bonus,
                    (value, key) => `bo-${key}`
                )

                return {
                    ...post,
                    ...experiment,
                    ...evaluation,
                    ...bonus,
                }
            }
        )

        const getQIds = (questions: Question[], prefix: string) =>
            questions.reduce((acc: any, el: any) => {
                if (el.type === FIVE_POINT) {
                    return [...acc, `${prefix}-${el.id}`]
                } else return [...acc]
            }, [])

        const a = getQIds(questionsA, 'A')
        const b = getQIds(questionsB, 'B')
        const ev = getQIds(evaluationQuestions, 'ev')
        const bo = getQIds(bonusQuestions, 'bo')
        const keys = [...a, ...b, ...ev, ...bo]

        const addAverage = (data: any, keys: string[]) => {
            const averages: {
                [key: string]: string | number
            } = {}
            keys.forEach((v) => {
                let counter = 0
                averages[v] =
                    data.reduce((acc: any, el: any) => {
                        if (el[v]) {
                            counter++
                            return acc + (Number(el[v]) || 0)
                        } else return acc
                    }, 0) / counter
                averages[v] = Number(averages[v]).toFixed(2)
            })
            averages['group'] = 'Average'
            return [...data, averages]
        }

        setPosts(addAverage(newPosts, keys) as never)
    }

    useEffect(() => {
        dispatch(setDoneDialog(false))
        getPosts()
    }, [dispatch])

    return (
        <Box p={4}>
            <MaterialTable
                options={{
                    exportButton: true,
                    exportAllData: true,
                    pageSize: 20,
                    // doubleHorizontalScroll: true,
                    maxBodyHeight: '78vh',
                    columnsButton: true,
                }}
                icons={tableIcons}
                columns={columns}
                data={posts}
                title="アンケデータ"
            />
        </Box>
    )
}

export default Analytics
