import * as moment from 'moment';
import * as  Color from 'color';

export interface GraphableData {
    [key: string]: { count: number, date: Date }[];
}

export interface StackedBarGraphData {
    date: Date;
    data: { [key: string]: number };
}

export interface LineGraphData {
    date: Date;
    count: number;
}

export function uuid() {
    return '_' + Math.random().toString(36).substr(2, 9);
}
const color = '#7b1fa2';
export const colors = [
    // '#fff',
    Color(color).lighten(.99).toString(),
    Color(color).lighten(.65).toString(),
    color,
];

export function getGraphableData(data: any, field: string, limit = 5) {
    const tempData: GraphableData = {};
    for (const a of data.aggregations[field].buckets) {
        for (const b of a.timestamp.buckets) {
            if (tempData[a.key]) {
                tempData[a.key].push({ count: b.doc_count, date: moment(b.key).toDate() });
            } else {
                tempData[a.key] = [];
            }
        }
    }
    let i = 0;
    for (const key of Object.keys(tempData)) {
        if (i >= limit) {
            delete tempData[key];
        }
        i++;
    }
    return tempData;
}

export function getStackedBarGraphData(data: any, field: string, field2: string) {
    const dateMap = new Map<string, { [key: string]: number }>();
    const ret: StackedBarGraphData[] = [];
    for (const a of data.aggregations[field].buckets) {
        for (const b of a.date.buckets) {
            if (dateMap.has(b.key)) {
                const c = dateMap.get(b.key);
                if (c[a.key]) {

                    c[a.key] += b[field2].value;
                } else {
                    c[a.key] = b[field2].value;
                }
            } else {
                dateMap.set(b.key, { [a.key]: b[field2].value });
            }
        }
    }
    for (const key of Array.from(dateMap.keys())) {
        ret.push({ date: moment(key).toDate(), data: dateMap.get(key) });
    }
    return ret;
}

export function getLineGraphData(data: any) {
    const ret: LineGraphData[] = [];
    if (!data.aggregations.date) {
        const dateMap = new Map<string, number>();
        for (const a of data.aggregations[Object.keys(data.aggregations)[0]].buckets) {
            for (const b of a.date.buckets) {
                if (dateMap.has(b.key)) {
                    let c = dateMap.get(b.key);
                    c += b.complexity.value;
                } else {
                    dateMap.set(b.key, b.complexity.value);
                }
            }
        }
        for (const a of Array.from(dateMap.keys())) {
            ret.push({ date: moment(a).toDate(), count: dateMap.get(a) });
        }
    } else {
        for (const a of data.aggregations.date.buckets) {
            ret.push({ date: moment(a.key).toDate(), count: a.complexity.value });
        }
    }
    ret.sort((a, b) => moment(b.date).isAfter(a.date) ? -1 : 1);
    return ret;
}
