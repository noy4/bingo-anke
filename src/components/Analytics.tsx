/* eslint-disable react/display-name */
import React, { forwardRef, useEffect, useState } from 'react'
import API, { graphqlOperation } from '@aws-amplify/api'
import { Box } from '@material-ui/core'
import { useDispatch } from 'react-redux'
import { setDoneDialog } from '../features/system/systemSlice'
import { listPostsSortedByBingoCountAndScore } from '../graphql/queries'
import { ColDef, DataGrid, ValueGetterParams } from '@material-ui/data-grid'
import moment from 'moment'
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

const formatTime = (time: number) => {
    return moment(time).subtract(9, 'h').format('HH:mm:ss')
}

const Analytics = () => {
    const dispatch = useDispatch()
    const [posts, setPosts] = useState([])

    const getExperimentTime = (params: ValueGetterParams) => {
        const experimentEndTime = params.getValue('experimentEndTime') as number
        const startTime = params.getValue('startTime') as number
        const experimentTime = experimentEndTime - startTime
        return experimentTime
    }
    const getEvaluationTime = (params: ValueGetterParams) => {
        const evaluationEndTime = params.getValue('evaluationEndTime') as number
        const experimentEndTime = params.getValue('experimentEndTime') as number
        const evaluationTime = evaluationEndTime - experimentEndTime
        return evaluationTime < 0 ? 0 : evaluationTime
    }

    const columns: ColDef[] = [
        { field: 'group', headerName: 'グループ', width: 100 },
        { field: 'displayName', headerName: '公開名', width: 150 },
        { field: 'from', headerName: '所属', width: 150 },
        { field: 'bingoCount', headerName: 'ビンゴ数', width: 100 },
        { field: 'score', headerName: 'スコア', width: 100 },
        { field: 'contents', headerName: '回答', width: 200 },
        {
            field: 'experimentTime',
            headerName: '実験アンケ時間',
            width: 150,
            type: 'number',
            valueGetter: getExperimentTime,
            sortComparator: (v1, v2, cellParams1, cellParams2) =>
                getExperimentTime(cellParams1) - getExperimentTime(cellParams2),
            valueFormatter: ({ value }) => formatTime(Number(value)),
        },
        {
            field: 'evaluationTime',
            headerName: '評価アンケ時間',
            width: 150,
            type: 'number',
            valueGetter: getEvaluationTime,
            sortComparator: (v1, v2, cellParams1, cellParams2) =>
                getEvaluationTime(cellParams1) - getEvaluationTime(cellParams2),
            valueFormatter: ({ value }) => formatTime(Number(value)),
        },
    ]
    const columns2 = [
        { title: 'グループ', field: 'group' },
        { title: '公開名', field: 'displayName' },
        { title: '所属', field: 'from' },
        { title: 'ビンゴ数', field: 'bingoCount', type: 'numeric' as const },
        { title: 'スコア', field: 'score', type: 'numeric' as const },
        // { title: '回答', field: 'contents' },
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
        setPosts(res.data.listPostsSortedByBingoCountAndScore.items)
    }

    useEffect(() => {
        dispatch(setDoneDialog(false))
        getPosts()
    }, [dispatch])

    return (
        <Box height="100vh" p={4}>
            <MaterialTable
                icons={tableIcons}
                columns={columns2}
                data={posts}
                title="アンケデータ"
            />
            <DataGrid rows={posts} columns={columns} />
        </Box>
    )
}

export default Analytics
