import * as moment from 'moment';

export interface GraphableData {
    [key: string]: {count: number, date: Date}[];
}

export interface StackedBarGraphData {
    date: Date;
    data: {[key: string]: number};
}

export function uuid() {
    return '_' + Math.random().toString(36).substr(2, 9);
}

export const colors = ['#FFDBD3', '#EA9E8D', '#FA8163', '#D66641', '#E5E5E5', '#C5C5C5'];

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

export function getStackedBarGraphData(data: any, field: string) {
    const dateMap = new Map<string, { [key: string]: number }>();
    const ret: StackedBarGraphData[] = [];
    for (const a of data.aggregations[field].buckets) {
        for (const b of a.date.buckets) {
            if (dateMap.has(b.key)) {
                const c = dateMap.get(b.key);
                if (c[a.key]) {

                    c[a.key] += b.complexityDensity.value;
                } else {
                    c[a.key] = b.complexityDensity.value;
                }
            } else {
                dateMap.set(b.key, { [a.key]: b.complexityDensity.value });
            }
        }
    }
    for (const key of Array.from(dateMap.keys())) {
        ret.push({ date: moment(key).toDate(), data: dateMap.get(key) });
    }
    return ret;
}
