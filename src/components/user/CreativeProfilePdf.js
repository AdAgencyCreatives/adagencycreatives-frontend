import React from 'react';
import { Circle, Document, Font, Image, Page, Path, Rect, StyleSheet, Svg, Text, View } from '@react-pdf/renderer';

import jost from "../../assets/fonts/Jost/static/Jost-Regular.ttf";
import jostLight from "../../assets/fonts/Jost/static/Jost-Light.ttf";
import jostMedium from "../../assets/fonts/Jost/static/Jost-Medium.ttf";
import jostBold from "../../assets/fonts/Jost/static/Jost-Bold.ttf";
import alta from "../../assets/fonts/Alta_Typeface/Alta_regular.otf";

import moment from 'moment';
import Placeholder from "../../assets/images/placeholder.png";

Font.register({
    family: "JOST",
    format: "truetype",
    fonts: [
        { src: jost },
        { src: jostLight, fontWeight: 'light' },
        { src: jostMedium, fontWeight: 'medium' },
        { src: jostBold, fontWeight: 'bold' },
    ]
});

Font.register({
    family: "ALTA",
    format: "opentype",
    src: alta
});

/* Create styles */
const styles = StyleSheet.create({
    page: {
        fontFamily: 'JOST',
        flexDirection: 'column',
        backgroundColor: '#fff',
        padding: '12.7mm'
    },
    section: {
        margin: 0,
        padding: 0,
    },
    flexRows: {
        display: 'flex',
        flexDirection: 'row',
        margin: 0,
        padding: 0,
    },
    flexCols: {
        display: 'flex',
        flexDirection: 'column',
        margin: 0,
        padding: 0,
    },
    sectionHeader: {
        display: 'flex',
        flexDirection: 'row',
        gap: '30px',
        margin: 0,
        padding: '30px',
        backgroundColor: '#f6f6f6'
    },
    sectionHeaderImage: {
        width: '100px',
        height: '100px',
        objectFit: 'cover',
        borderRadius: '50px'
    },
    sectionHeaderDetail: {
        margin: 0,
        padding: '10px 0px 0px 0px',
    },
    content: {
        width: '100%',
        display: 'flex',
        gap: '10px',
        margin: 0,
        padding: '15px 0px 0px 0px'
    },
    contentLeft: {
        width: '60%',
        flex: 1
    },
    contentRight: {
        width: '40%',
    },
    heading1: {
        fontSize: '16px',
        fontWeight: 'normal',
        margin: '12px 0px',
        lineHeight: '1em',
    },
    heading2: {
        fontSize: '14px',
        fontWeight: 'normal',
        margin: 0,
        padding: '10px 0px',
        lineHeight: '1em',
    },
    heading3: {
        fontSize: '12px',
        fontWeight: 'normal',
        margin: 0,
        padding: '0px 0px',
        lineHeight: '1em',
    },
    lightText: {
        fontSize: '12px',
        fontWeight: 'light',
        margin: 0,
        padding: '0px 0px 8px 0px',
        lineHeight: '1em',
    },
    creativeDetails: {
        backgroundColor: '#f6f6f6',
        borderRadius: '8px',
        padding: '0px 10px 6px 10px'
    },
});

/* Create Document Component */
export default function CreativeProfilePdf({ data = null, filename = "", creative_education = null, creative_experience = null }) {

    const htmlToText = (html) => {
        var tempDivElement = document.createElement("div");

        // Set the HTML content with the given value
        tempDivElement.innerHTML = html;

        // Retrieve the text property of the element 
        return tempDivElement.textContent || tempDivElement.innerText || "";
    };

    const isCharNumber = (c) => {
        return typeof c === 'string' && c.length == 1 && c >= '0' && c <= '9';
    }

    const getNumericString = (phone) => {
        let result = [];
        for (let i = 0; i < phone.length; i++) {
            const element = phone[i];
            if (isCharNumber(element)) {
                result.push(element);
            }
        }
        return result.join('');
    };

    const formatPhone = (phone) => {
        phone = getNumericString(phone);
        let result = [];
        for (let i = 0; i < phone.length; i++) {
            const element = phone[i];
            result.push(element);
            if (i == 2 || i == 5) {
                result.push('-');
            }
        }
        return result.join('');
    };

    const IoLocationOutlineSvg = ({ size = 16, color = "currentColor" }) => {
        return (
            <Svg stroke={color} fill={color} strokeWidth="0" viewBox="0 0 512 512" height={size + "px"} width={size + "px"} xmlns="http://www.w3.org/2000/svg">
                <Path fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32" d="M256 48c-79.5 0-144 61.39-144 137 0 87 96 224.87 131.25 272.49a15.77 15.77 0 0025.5 0C304 409.89 400 272.07 400 185c0-75.61-64.5-137-144-137z"></Path>
                <Circle cx="256" cy="192" r="48" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32"></Circle>
            </Svg>
        );
    };

    const IoCalendarClearOutlineSvg = ({ size = 16, color = "currentColor" }) => {
        return (
            <Svg stroke={color} fill={color} strokeWidth="0" viewBox="0 0 512 512" height={size + "px"} width={size + "px"} xmlns="http://www.w3.org/2000/svg">
                <Rect width="416" height="384" x="48" y="80" fill="none" strokeLinejoin="round" strokeWidth="32" rx="48"></Rect>
                <Path fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32" d="M128 48v32m256-32v32m80 80H48"></Path>
            </Svg>
        );
    };

    const IoMailOutlineSvg = ({ size = 16, color = "currentColor" }) => {
        return (
            <Svg stroke={color} fill={color} strokeWidth="0" viewBox="0 0 512 512" height={size + "px"} width={size + "px"} xmlns="http://www.w3.org/2000/svg">
                <Rect width="416" height="320" x="48" y="96" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32" rx="40" ry="40"></Rect>
                <Path fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32" d="M112 160l144 112 144-112"></Path>
            </Svg>
        );
    };

    const IoCallOutlineSvg = ({ size = 16, color = "currentColor" }) => {
        return (
            <Svg stroke={color} fill={color} strokeWidth="0" viewBox="0 0 512 512" height={size + "px"} width={size + "px"} xmlns="http://www.w3.org/2000/svg">
                <Path fill="none" strokeMiterlimit="10" strokeWidth="32" d="M451 374c-15.88-16-54.34-39.35-73-48.76-24.3-12.24-26.3-13.24-45.4.95-12.74 9.47-21.21 17.93-36.12 14.75s-47.31-21.11-75.68-49.39-47.34-61.62-50.53-76.48 5.41-23.23 14.79-36c13.22-18 12.22-21 .92-45.3-8.81-18.9-32.84-57-48.9-72.8C119.9 44 119.9 47 108.83 51.6A160.15 160.15 0 0083 65.37C67 76 58.12 84.83 51.91 98.1s-9 44.38 23.07 102.64 54.57 88.05 101.14 134.49S258.5 406.64 310.85 436c64.76 36.27 89.6 29.2 102.91 23s22.18-15 32.83-31a159.09 159.09 0 0013.8-25.8C465 391.17 468 391.17 451 374z"></Path>
            </Svg>
        );
    };

    const FaStarSvg = ({ size = 16, color = 'currentColor' }) => {
        return (
            <Svg stroke={color} fill={color} strokeWidth="0" viewBox="0 0 512 512" height={size + "px"} width={size + "px"} xmlns="http://www.w3.org/2000/svg">
                <Path d="M256 372.686L380.83 448l-33.021-142.066L458 210.409l-145.267-12.475L256 64l-56.743 133.934L54 210.409l110.192 95.525L131.161 448z"></Path>
            </Svg>
        );
    };

    const BullseyeIcon = ({ size = 16 }) => {
        return (
            <Image src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAYAAACtWK6eAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEwAACxMBAJqcGAAAGABJREFUeJztnXmcHVWVx7+v01kgewgJipCwCQkhQCIwyCKLMgMDwrgAkVFAFhlhBAcXxlEYEBcWBwYQMwJCBgUEYUYBB2cAZYlIICwJBERiOpAESAhZCFk66S7/OF2Tl8573XVu3aXqvfv9fM4nn09/KlW/e6vOq7r3nnsORCKRSCQSiUQikUgkEolEIpFIJBKJRCKRSCQSiUTKQQU4I7SISKSIVIAbgHtDC4lEikbqHAlwU2AtkUihqHaOBPhuWDmRSHHo7hwJcF5QRZFIQajlHAkwJaSoSKQI1HOOBDg8oK5IJDg9OUcCTAgnLRIJS2/OkQCjgqmLRAKSxTk6gJZQAiORUFSAG+nZORLgrVACI5FQZHWOBJgdSGMkEgSNcyTAg2FkRiL+0TpHAtwWRGkVcQAU8UE6ID9N+f8WO9CiIjpIxDWmzgEFGKS3hhbQwFSAwcAAoF+XtQKdwAZgHbCqy5JAGl2TxzmgAG+Q6CDmfADYDdihy8Z2/W1rYCtgBNAnw3kSYAXyMCwGFgLzgXnAn4CXu/5WNvI6B8Q3SGnYATgA2AfYE9gDcQAbVIBhXfbBOsesAJ4HngGeAn4PtFm6vgtsOAcU4A0Sqc32wBeAO4FF6GZefNkC4KfAycD73XSDERVkk5ONNo7xrD1ShwqwP3AF8CLhH34Texa4GNjLct9osOkcCbCFX/mbUwktIDCTkP0GxyNvjUbhFeAO4FbgVU/XTNc5Pm/pfKuQSQ4TtgBGd9moLhtd9e8TwDVZTtSMDjIEOAnJlrF3YC0+eBz5Vb8DWOvoGradA2AusHPV+Uew6UNe68FP/zaoh/P+Cvg00G5Ra0OwK/AfwHuE/xwKYW8Dl2P/TWn7syq1VcBzyBhwvaVz/hKZbo9UcTCSOqaT8A9pEWw9MrifmKdTu3DlHC4sOkc3DgJ+R/gbU1TrBO5Bpq1NiM5RUj4E/C/hb0pZrBO4HdhR0cfROUrI+4BpxE8pU2sHrgKG9tLPLTSRczTCLFZf4CvAN+h59sIXCbAcGRQvRQab65AHcD3ygPVFpiIHIw/kKCQ8pQj3YwlwHLJa350WZLbqVK+KzLAyW1X2UJP9kBsWIvPFQmBWl72CxE61Aa8jwYhaWoFtkdXjnZE4r/HIwt+2+eVm5jEknKU7TeccZWZL5HOgAz+v6nXIg/N94BhgpPsmbsIo4OPAZcAfEAd00c67qf2j2QL8xNE1C/dZVXYmIxGurjt6ATAVOJZifLpVMxT4JHAzEtBno72/IDpHqWkBLkBem646+E3gWuBAijEeyEIfJPvgj4FlROdoSrYCfoObju0Afo0MTMs+JhsAnAj8luztv4voHKVmEjL4td2pK4Ef0Lgh1eORT8TV1O+D+OYoOScBa7DboYuBr9L7fH+jMBK4FNl01b0vPlzj+OgcJeFC7HbmUmQMM9BnIwrEMMRR0j3wCbBLt2Oic5SAvsjsjK2ObAeupHneGL0xGolq7kCcpppJhH/wo3P0wBbIgNlWR97H5r+SEaFWkOKRhH/4o3PUYRDwMHY68U1kJTWi42TCO0B0jhoMRWJ/bHTiNGC4X/kNw9cI7wTROboxEJhO/g58B9lbHjHnSsI7QnSOKgYAD5G/Ax8HtvOsvRH5T8I7Q3SOLlqRQXTeDrwGmfmK5OcBwjtEdI4ufky+zlsLfNa76sbmGcI7RXQOZMEuT+e9jQQURuyykPCO0fTO8SnybYudS/0ctpF8uIyUjs6Rgd3ZNNRBay8ie88j9hlOdI6gDEW2ppp23jP438nXTOxKdI6g/BLzznuWzeOGInY5mOgcwTgH886bgxSlibjlU0Tn2Awf20rHAzORRUEtbUjhmkU2BTmmgoyTxgDbIJ+FQ4D+bCzBthbZsLUUiRtrY2MdkhAMAv4H/zODTZ99pB+SgNjkl2UZMM6/ZBUtSI7bf0D2Ucyk5x18PdkqJN3ODcDpSNofHwxCMrbEN0cALsas89YBh/iXm4nBwGeQGt5v4/YhWoA4zNHIG8g20TkCMgHzefUzAujtiRbgKCRvlO0twFltGeIs+1lqU3SOgLQgCc5MOvCGAHrrMQRJazqfME5Rz55BwmxMs7BE5wjMWZh14FO4+ZTQMhT5PKyV6KBI1oYUG9UEaxbNOSrIAnLTMAxJgKztwHfZWHIrFH2B85C9JaEffo29imRa7I0iOsf1yFiraZJpXIVZJ9qsb2fCwcBLhH/Y89hD1F9QdeUcK5AIiceRgjxTgUuAs5Ep3I/Qs3Ok57m0ju6GYhfMBub3hBDbxUDgRzRGXZFv12mjDeeYBZyCTFZMRjaomX4Od3eOBJkeL1K9dyfchr7jlxEuAHEy8McMGstgrp3DVjRDLedIrUgTNNbZHbNyBKeHEAuciaxoh36wo3NstA00cJqmX6Dv/McC6OxDzzepbFZ05+iDhNxMRBLW9XbNW3Jezyq2YrHGAy8oz9cJ7IPM6ftiIHAn8h3tik5kVmkOMg37BhJztYaNJdgGIRnrPwDshLx9xxhc61LgWzX+biO2ajZSVmFJjnPsBTyNOElWOpDQ+7k5rls4bkT/63STZ41DkJkW27/gncCTyLrJoZhPV26NlGC4FvhzhusW/c2RYjIuvd7StQvBaPTf8qvxOzAfgjzENh1jDnA+8hZwwWTgauTtU1bnAHkzrlNqWG1ZQ1BMAhKv9KhvS+BRA4317H7gMI/6BwCnsXGNpkzOkXKNgZZvOtDhnVY27mPIau/ib+tsC/l2Mlbbw8iYKRQt1B9TFNk5QAbp2iDP19CNXQrJcehvxBUe9Zmu6lfbAuATHjVrKbpzpFxroOs4x5qccz+6Brfj7pu9O59VaqtlNyPjl6JSFucA2B6ZxdNou9eDLme8H/3C4K2etO2O+c6+BNndd6InraaUyTlSblfq24B8npWS89DfkA950NUfufGmD00bstmryJTROUA2e2l1ftmzRmto63nM9KTrMqWuanuO4v9ildU5UrT5f/8QRmY+tkcf/XqWB12TkdeyyUPzFMUvvOPaOXxsVvtCBo3dbYwHXVY5F10D1+B+sFsBZih1pfY80TnOQfbcu2YY+infcz3osoq2joSP/R4nKzWl9hrF34fgwznS4w531Ygq7qyjsZ495EGTNbZA/wtwgmNN/YHXlZoSZKZrL8fa8uLaOc7uduyzuE8oqM3iuB5Jt1QKjkL/ELreb/wlpabUTnGsKy++nSM117UetwTeq3PtenaMY03W0BZ6vN+xnr7Iarf2wfm5Y115CeUcCRLq7votog0B+nfHeqzxBLqGneNYz+eUehJkj0ORSym4do4vZvj/R9tv1iacnkFDtT3rWI8VBqAPXd7JsaanlXoSiv1pVQTnSIAHrbdsU7bPqCO1DZRgHHIQukbNd6xnklJPgqx3+MhqPxn4OrIVeTaSxX0lks/3RWRK9avAHlX/x4dzaNavXJe6+5NCSwJ8zLGe3HwZXYNud6zHJEL0CId6BiMPvfbGz0EmGlw6x77oF3e/l7M/ekO7E/UCx3pyczO6Brkcf7Qgv8oaPa7CFlqQSIFau/98WW/hI61InJnmnK/h9m17mlLPnQ61WGEmuga5DE40KRnmYvpyNPK9HsoxsjhHijYCIgH+St8lmdldqeUVh1py0wfdAuEGzKpKZUUblPgG5tnQ67Eb8itbBucACffRVhn+vq5LVPRBty1hA8VIbl6THdF17EuO9Tyv1HOZ5evvCixWagjpHCk/UV7jOeX5tWjj5wq7FeEwdA1xuRA3HP2Ac2+L1x8BzFNevwjOAfr72Ink8HLFNKUer9ufWxTH7qA896vK4zXsj27w+Bp2F5puAcZaPJ+WPEndHkGmmrNSQQqpukL7pTHGiYo6aBxkrPLc85THa9AO/n9j8drHEzYuKG/Gww4kGluDrbJvtfiz8vjCOsi2ynO3KY/XMFF5/KOWrtsKXG7pXCbYSAcK+vBxlxHP2sVkr1sTNA6ijV16XXm8hvHK422tf0wh7O62qeR3DoDpyuO1/a1hgfL40U5UWGA6usGUy4GdZmpwFfYWux5RXNeFPW2pHRV09Rc7cFd8sy+6CRfXs6PGaArNdKB7O2kYpdCRYC97/GiKUYVqrKX2aKsQ72jpurXQ1IRc5FDHZmge4qGKY5chD5MLRimPb7N03UPxE+TYG7YC9rSDY5fZXlYqjvWayE/jIJoVzNVaIQq0n25vWbruJEvnyYut8J2FyuNdpgnSOMhAPP5QaRxE8w26TitEgfYX5B1L1y1KaTBbOjRrIeB2L8Ya5fGauvC5cOUg7VohCrSDxbWWrjvC0nnyov3ErMd7yuNdxtWtVx5fSAfRpKLfoBWiQJsS35YWlw+IBlsBlx3K411NuoBei7eyCJpGa7zc1ZQghPu10f7iusKWDm1UrMvPZq0Wl18om6BxEI0olw6ivVG2Ug4ttnSevNiadNhSebxLB9E+Ly61bEIZHWSF8nhbY4eXLZ0nL3+0dB5tZMRyS9etheYNktYY8YLGQTSDXZdz1drZF20MWT2etHSevNgKm9H2y1JL162F5nmxNemSCY2DLFMcOwR3Mw1vKI/XhunX4zE8vtrr0IHUSrSBtl/etHTdWmjWtjTPYW40DqL95XYVi7US3et+Z+x88q0ifEmwB7ETrFgBximOb0e/sJiVgUi+56xon8NcaBxE+4p1ufI6V3FsK/a2af7I0nlMmWrpPDshObiyMh93oUPa58Tlp95maBxE+8s1Rnm8hheUx+9v6boPI5W1QjALyWdrA+0OQW1/a9A+JzbeoJnROIh2f8dY5fEanlcef6jFa38Jd7+mPZHW8LCBtj9mWbpuLbRjIZf7jDZD4yDzlOe2NTiuxQzl8R/F3gr0TOxnSOmNa5FJAhtUgL9W/h+XM3hjlcdrn0NvfBjd/gGXZQ/6I9N9Gj3ah6In+gD/p7y+qU3H7rrSgcrrd6Db6qDlDqUel6ljc7ENuoa4fhU+rNQzzfL1B2NeEzGrzcZ+kOR1Sg22djHWY45ST1Giqmui2fmV4LYw5teUWt7D/i/hICRjigvneAQpeGmTAcg6gkbHpZY1VNMfXVXiNXgMVDRBuyfb5uC4O+OUWhLgnxzoaAEuYmMIRF7bgIxxbKdJBX3RmgS3uXknK7XMdKjFCtpyA99wrOcFpZ75uFvhn0D+cckjuNu52IIkPNDoaXOkJUVbW/IWx3pyo/0F+rVjPf+i1JMghexdsi9S92J5Rj0rkfHRgY51/X1GPdXmerbu50o9Lr4AekS7t3ciujWI5UjIiat1g22Rt4Lmu3QRUjnJ9f6OVmT/+L5IouuRSFjFaiRc4hWk2tUM9HtctPRH3h7aqfddcVtyYAG6oMkD0ef08koL2X8ZU9vXsSZttdQE+K5jTUXD5E37W8eaxiv1rKXApQ+qeQBdwy5yrOcQpZ4ECb7Tpi8tK7ugq+uS2scd6zpfqedxx3qs8U10DXvCg6anlJoSpO6Fy41dRaAVfdnuBPkcc51aRzuh4bKQj1X2Q9ewDuB9jjUdrdSUWmmK0xvyHcz6ZYpjXcPQlxM/3LEma7QgEZWaxv2jB13aVJqpneRBWwiOxSxV6mzcZjABOFWp6V1K9ra/DV0DfXw/amPFUluL2wIxIZiEvhZhaj5inbTjWFth/t44CV0DO/FTNuBnSl2pvQPs6UGfD3ZFMp+Y9IOPB3EU+qgD12tX1hmCPpr2Eg+6RmFeq3wxbgvF+GAcsrZg0v53ge08aNTG0G3AXjZJr/w3uoYuwE+g2eeUuqptGfARDxpdsB/5qu6e7UmnpoxGgsx2lZIp6G+C67n1lDsNtKW2DjjFk05bnICuqFB3cx0SlHKogbbTPWmzziDktaxp7O88aRtO/jLNU9Fl2whBP+Bq8rVzEf7Kmt2n1LaW4iQNN+JG9DfEVn2L3tgbsxXkansR2MeTXi17IqWt87SvHX8zeOPQTzvf7kmbM7SLhgkSwemLKeQvm9YBXIPbzV8ahgBXYGf/yZkedd9koK80i4M98Tz6B85WnqosmATq1bK3kRkYbdJnWwwAzsV8Cre7+Qzd2Am9Q8+lGCXvcnMm+ptzt2eNeb/Tq20J8K/4q9c9CnHyNy224Ub8PnzTDDSe71GfUwagn17sRLZb+qKCDLptPWAJMj9/L7JoajtZ9yBkZuoeZJxgU/fPcB9KUs04dPvOE2RLhcuSb965CP2NejSAzqsMdGaxdmSG7mIkvZA2OHMUkrvrQuAh9IF8We0G/DoHyBSyVuflnjXWxdZrdiSys0/7fX48cJclDVm5ANkw5foTYzky1bwIWd1fjXyH90Wmj7dCHGkH/Exlfgf4FvIA+uJI9Gss7UhNdlfJsoNxBfpfijbCDHpPJN/CWplsLRI965t+SNEhrd4fBtDqhZHoFw4T4AchxCLrCHMzaiyrvUa4dZyLM2qstjX4m/wIgskGnQ34WzzszlDMI4CLbncTbhV6PGbjqKtCiPXJMGS9QNsxswi7If8E8gX6FcmWEjaWrBWzzWsrKGnUrpYvYnZjQ/96bIWsD3QQ/iE3sU7gVvzFVdXjEsz0fyWE2BD0QbZtmtzgImTunoSkvAn9wGtsOvaKBOXhQPRrHgmSe8tVxstCchhmN/ot7FWlzcthyNpG6Ie/J/s98DeO2q9la2RSwKQdRwfQGxyT8IIESVNTpA36+yADee0OSlfWjqwdFWkffR9kgdOkPb7XwQrDCMwD60IXy6zFCCQ7y3TyRwib2AwkN20RB7KXY9amZUjdmablRMwfiPMC6M3KdkiQ5n9hvgc+y8PzK2TSY6yXVplxGuZtLO1uQZtoM3in1gEcF0Cvlgoy738Ksuj5ADLozLoO0A68iuy9vhr4PLAH5Qj1/hjm+1LuC6BXjY+bMBzZM2KSMWMNEvxnq4ClTypI20ciC5L9kbFVO+I8K5E1o2WEqZqbl8lIGTyTSOa3kNzIi60qKjGHYL6+sIJwK+2R2uyO2YJwakf6l1x8TGJzUltK82RjLzq7AG9gfi+v8C+5HLQgpaHzOElREyg0CxPI5xwPU/AinKEZTr4I2pXAQd5VR0A+c/PM2L2OLCZGemECMq4w7eg1wCe9q25ujsRsK0Nq7xHHkSqOIF/amk6aKLgtMGdhFl+VWgdSiiGixKRmd3e7kZLUrSshfZECQ3nv0bm+hTcSF5L/BszAT1byZmIbZO0p770pTPKFMmMax1NtS4BjfAtvUD6KJJrIe0+u9y28kfkh+W9IelOKnnC6qPRDQmVsBGJOoxyhMqWhAlyHHSd5iWKFgpeBfdCnkK1ntxDXOpxxGXZuUifyNrGd8bDR2BL4N/LNUlXbdcQ3h3O0ddh7skVIlG28aZszBfMdgLXse37lNzenYjcn7Qxkv3QE9kWqDtvq2w3InpWIZw5H0nfaupEJslejWeO59kaSbdvsz3eBv/XZiMimjEc2H9m8qQkSNHmox3aE5ACk4KrtbcLzKH9V4IZgKFK/27aTJMDTSPmCRluN7wt8Gsl64qLfHqDktQMbjQpSRMbWbEt3W4psd/VZ+coFuyH7LVxliewAvo3/EgqRjBxA/uq1vdlsZCZtF09tysuOSEmHvAU9e7PXkZ2hkYIzBPgpbh+G1F5GUqIegVTSKgL9kQmMK5EqvD764S6KU8Q0kpG/Q4qs+HhAEiTRwhPIg/kJpDCl6/WVClJg51hkEXU6fhPYvYUk9m5ayr6ANhR5cM4kTFtWAS8gM21tyOfffCShQWrre/j/rUjWk9S2RxxiB+QTbwLhogFuRvbcvBPo+hGL7I8sBvr6ZdXYWmSr8BJkZX8JsqOyKKlMu9uzwMG67o+UgQoSVmIjVLsZbTFwBnGGquEZCPwz7lKCNpotRzauxcDOJmMIUp7adrhKo9hK4FLi7FTTMxjJij6f8A9lEWwh8HWkXF4k8v+0Ap/BbiRrmexJZIxWpNorkYIyHtkolCe/bBnsHeAaYtrWiCF9gaOQPdR5ktkVyVYikQbHEN8WEYv0R/Y2XEe+9KghbD4wFVlxL0pITENQ9pV0l3wQKRBzALIbsUi5txYiYSfTgQeBOWHlNC7RQbKzHbJddSJSAWoiEknrsg8TJIRlFhJlPAt4qutvEQ9EB8lHP2AMG+OntkNiqrbq+nc48umWVpfqh8Rmrauy5chkwdKufxcgMV3zkE+ntd5aE4lEIpFIJBKJRCKRSCQSiUQikUgkEolEIpFIJNIjfwGRbelNIo7gJwAAAABJRU5ErkJggg=="
                style={{ width: size + 'px', height: size + 'px', objectFit: 'cover' }}
            ></ Image>
        );
    };

    const AdIcon = ({ size = 16 }) => {
        return (
            <Image src="/static/media/adicon.5edd0472108d29405b0c.png"
                style={{ width: size + 'px', height: size + 'px', objectFit: 'cover' }}
            ></Image>
        );
    };

    const TimeIcon = ({ size = 16 }) => {
        return (
            <Image src="data:image/png;base64,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"
                style={{ width: size + 'px', height: size + 'px', objectFit: 'cover' }}

            ></Image>
        );
    };

    const Header = () => {
        return (
            <>
                <View style={styles.sectionHeader}>
                    {data?.profile_image_base64?.length > 0 ? (
                        <Image source={data?.profile_image_base64} style={styles.sectionHeaderImage} />
                    ) : (
                        <>
                            {data?.user_thumbnail_base64?.length > 0 ? (
                                <Image source={data?.user_thumbnail_base64} style={styles.sectionHeaderImage} />
                            ) : (
                                <Image source={Placeholder} style={styles.sectionHeaderImage} />
                            )}
                        </>
                    )}

                    <View style={[styles.flexCols, styles.sectionHeaderDetail]}>
                        {data?.name?.length > 0 && (
                            <Text style={{ fontSize: '26px', fontWeight: 'normal', lineHeight: '1.5em' }}>{data.name || ""}</Text>
                        )}
                        {data?.category?.length > 0 && (
                            <Text style={{ fontSize: '16px', fontWeight: 'normal', lineHeight: '1.5em' }}>{data.category || ""}</Text>
                        )}
                        {(data?.location?.state?.length > 0 || data?.location?.city?.length > 0) && (
                            <View style={[styles.flexRows]}>
                                <View style={{ marginTop: '2px', marginRight: '4px' }}>
                                    <IoLocationOutlineSvg size={14} />
                                </View>
                                <Text style={{ fontSize: '14px', fontWeight: 'light', lineHeight: '1.5em' }}>{data.location.state || ""}{(data?.location?.state?.length > 0 && data?.location?.city?.length > 0) && <>, </>}{data.location.city || ""}</Text>
                            </View>
                        )}
                    </View>
                </View>
            </>
        );
    };

    const Content = () => {

        const ContentLeft = () => {

            const getAboutLines = () => {
                let lines = [];
                let aboutText = htmlToText(data.about);
                if (aboutText.indexOf('\n') >= 0) {
                    lines = aboutText.split('\n');
                } else {
                    lines = [aboutText];
                }
                return lines;
            };

            const About = () => {
                return (
                    <>
                        {data?.about?.length > 0 && (
                            <View style={[styles.flexCols]}>
                                <Text style={styles.heading1}>About</Text>
                                {getAboutLines().map(line => <Text style={styles.lightText}>{line}</Text>)}
                            </View>
                        )}
                    </>
                );
            };

            const ProfileThumbnails = () => {
                return (
                    <>
                        {data?.portfolio_items_base64?.length > 0 && (
                            <View style={[styles.flexCols]}>
                                <Text style={styles.heading1}>Profile Thumbnails</Text>
                                <View style={[styles.flexRows, { flexWrap: 'wrap', gap: '8px' }]}>
                                    {data.portfolio_items_base64?.length > 0 && (
                                        <>
                                            {data.portfolio_items_base64.map(item => {
                                                return (
                                                    <>
                                                        <Image src={item} style={{ width: '90px', height: '90px', borderRadius: '8px', objectFit: 'cover' }} />
                                                    </>
                                                );
                                            })}
                                        </>
                                    )}
                                </View>
                            </View>
                        )}
                    </>
                );
            };

            const PortfolioSite = () => {
                return (
                    <>
                        {data?.portfolio_website_base64?.length > 0 && (
                            <View style={[styles.flexCols]} wrap={false}>
                                <Text style={styles.heading1}>Portfolio Site</Text>
                                <View style={[styles.flexRows]}>
                                    <Image src={data.portfolio_website_base64} style={{ width: '250', height: 'auto', objectFit: 'cover' }} />
                                </View>
                            </View>
                        )}
                    </>
                );
            };

            const Education = () => {

                const Item = ({ data }) => {

                    return (
                        <>
                            <View style={[styles.flexRows, { gap: '8px', alignItems: 'flex-start', paddingBottom: '8px' }]} wrap={false}>
                                <Text style={{ fontSize: '20px', fontWeight: 'bold', marginTop: '-11px' }}>.</Text>
                                <View style={[styles.flexCols]}>
                                    <View style={[styles.flexRows, { gap: '8px' }]}>
                                        {data?.degree?.length > 0 && (
                                            <Text style={[styles.heading3]}>{data.degree || ""}</Text>
                                        )}
                                        {data?.completed_at?.length > 0 && (
                                            <Text style={[styles.lightText, { fontSize: '10px', padding: '2px 0px 0px 0px' }]}>{data.completed_at && moment(data.completed_at).format("M/D/YYYY")}</Text>
                                        )}
                                    </View>
                                    {data?.college?.length > 0 && (
                                        <Text style={styles.heading3}>{data.college || ""}</Text>
                                    )}
                                </View>
                            </View>
                        </>
                    );
                };

                return (
                    <>
                        {creative_education?.length > 0 && (
                            <View style={[styles.flexCols]}>
                                <Text style={styles.heading1}>Education</Text>
                                <View style={[styles.flexCols]}>
                                    {creative_education?.length > 0 ? creative_education?.map(item => <Item data={item} />) : <></>}
                                </View>
                            </View>
                        )}
                    </>
                );
            };

            const WorkExperience = () => {

                const Item = ({ data }) => {

                    return (
                        <>
                            <View style={[styles.flexRows, { gap: '8px', alignItems: 'flex-start', paddingBottom: '8px' }]} wrap={false}>
                                <Text style={{ fontSize: '20px', fontWeight: 'bold', marginTop: '-11px' }}>.</Text>
                                <View style={[styles.flexCols]}>
                                    <View style={[styles.flexRows, { gap: '8px' }]}>
                                        {data?.title?.length > 0 && (
                                            <Text style={[styles.heading3]}>{data.title || ""}</Text>
                                        )}
                                        <Text style={[styles.lightText, { fontSize: '10px', padding: '2px 0px 0px 0px' }]}>
                                            {data?.started_at && moment(data.started_at).format("M/D/YYYY")}
                                            {(data?.started_at && data?.completed_at) && <>–</>}
                                            {data?.completed_at && moment(data.completed_at).format("M/D/YYYY")}
                                        </Text>
                                    </View>
                                    {data?.company?.length > 0 && (
                                        <Text style={styles.heading3}>{data.company || ""}</Text>
                                    )}
                                    {data?.description?.length > 0 && (
                                        <Text style={styles.lightText}>{data.description || ""}</Text>
                                    )}
                                </View>
                            </View>
                        </>
                    );
                };

                return (
                    <>
                        {creative_experience?.length > 0 && (
                            <View style={[styles.flexCols]}>
                                <Text style={styles.heading1}>Work & Experience</Text>
                                <View style={[styles.flexCols]}>
                                    {creative_experience?.length > 0 ? creative_experience?.map(item => <Item data={item} />) : <></>}
                                </View>
                            </View>
                        )}
                    </>
                );
            };

            const CreativeReviews = () => {

                const average = (items) => {
                    let sum = 0;
                    for (let index = 0; index < items.length; index++) {
                        const element = items[index];
                        sum += element.rating;
                    }
                    return (sum / (items.length || 1)).toFixed(2);
                };

                const Item = ({ data }) => {

                    const RenderStars = ({ count, color = '#000000', size = 16 }) => {
                        let stars = [];
                        for (let index = 0; index < count; index++) {
                            stars.push(<FaStarSvg size={size} color={color} />)
                        }

                        return (
                            <>
                                {stars.map(item => item)}
                            </>
                        );
                    };

                    return (
                        <>
                            <View style={[styles.flexRows, { gap: '8px', alignItems: 'flex-start', paddingBottom: '8px' }]}>
                                {data?.profile_picture_base64?.length > 0 ? (
                                    <Image src={data.profile_picture_base64} style={{ marginTop: '5px', width: '50px', height: '50px', objectFit: 'cover', borderRadius: '100%' }} />
                                ) : (
                                    <Image source={Placeholder} style={styles.sectionHeaderImage} />
                                )}
                                <View style={[styles.flexCols]}>
                                    <View style={[styles.flexRows, { gap: '8px' }]}>
                                        {data?.user?.length > 0 && (
                                            <Text style={[styles.heading3]}>{data.user || ""}</Text>
                                        )}
                                        {(data?.rating + "")?.length > 0 && (
                                            <View style={[styles.flexRows, { gap: '2px', alignItems: 'center' }]}>
                                                <View style={[styles.flexCols, { justifyContent: 'center', alignItems: 'center', width: '18px', height: '18px', backgroundColor: '#daa520', borderRadius: '100%' }]}>
                                                    <Text style={[styles.lightText, { padding: '0px', fontSize: '8px', fontWeight: 'medium' }]}>{data.rating}.0</Text>
                                                </View>
                                                <RenderStars count={data.rating} color='#daa520' size={12} />
                                                <RenderStars count={5 - data.rating} color='#00000' size={12} />
                                            </View>
                                        )}
                                    </View>
                                    {data?.created_at?.length > 0 && (
                                        <Text style={styles.lightText}>{moment(data.created_at).format("MMMM D, YYYY")}</Text>
                                    )}
                                    {data?.comment?.length > 0 && (
                                        <Text style={styles.lightText}>{data.comment || ""}</Text>
                                    )}
                                </View>
                            </View>
                        </>
                    );
                };

                return (
                    <>
                        <View style={[styles.flexCols]} wrap={false}>
                            <View style={[styles.flexRows]}>
                                <Text style={styles.heading1}>Creative Reviews</Text>
                                <View style={[styles.flexRows, { margin: '14px', justifyContent: 'center', alignItems: 'center', width: 'auto', padding: '0px 5px', height: '20px', backgroundColor: '#daa520', borderRadius: '100%', gap: '5px' }]}>
                                    <FaStarSvg size={12} />
                                    <Text style={[styles.heading3]}>{average(data.reviews || [])}</Text>
                                </View>
                            </View>
                            <View style={[styles.flexCols]}>
                                {data.reviews?.length > 0 ? data.reviews?.map(item => <Item data={item} />) : <></>}
                            </View>
                        </View >
                    </>
                );
            };

            return (
                <>
                    <View style={[styles.flexCols, styles.contentLeft]}>
                        <About />
                        <ProfileThumbnails />
                        <PortfolioSite />
                        <Education />
                        <WorkExperience />
                        <CreativeReviews />
                    </View>
                </>
            );
        };

        const ContentRight = () => {

            const CreativeDetails = () => {

                const Item = ({ icon, heading, content }) => {
                    return (
                        <>
                            <View style={[styles.flexRows]}>
                                <View style={{ paddingTop: '2px', paddingRight: '8px' }}>
                                    {icon}
                                </View>
                                <View style={[styles.flexCols, { flex: 1 }]}>
                                    <Text style={styles.heading3}>{heading}</Text>
                                    <Text style={styles.lightText}>
                                        {content}
                                    </Text>
                                </View>
                            </View>
                        </>
                    );
                };

                return (
                    <>
                        <View style={[styles.flexCols, styles.creativeDetails]}>
                            <Text style={[styles.heading2, { paddingTop: '14px' }]}>Creative Details</Text>
                            {data?.years_of_experience?.length > 0 && (
                                <Item icon={<IoCalendarClearOutlineSvg size={12} />} heading={"Years of Experience"} content={
                                    <>
                                        {data.years_of_experience}
                                    </>}
                                />
                            )}
                            {data?.email?.length > 0 && (
                                <Item icon={<IoMailOutlineSvg size={12} />} heading={"Email"} content={
                                    <>
                                        {data.email}
                                    </>}
                                />
                            )}
                            {data?.phone_number?.length > 0 && (
                                <Item icon={<IoCallOutlineSvg size={12} />} heading={"Phone Number"} content={
                                    <>
                                        {formatPhone(data.phone_number)}
                                    </>}
                                />
                            )}
                            {data?.industry_experience?.length > 0 && (
                                <Item icon={<BullseyeIcon size={12} />} heading={"Industry Experience"} content={
                                    <>
                                        {data.industry_experience?.length > 0 ? data.industry_experience.join(', ') : ''}
                                    </>}
                                />
                            )}
                            {data?.media_experience?.length > 0 && (
                                <Item icon={<AdIcon size={12} />} heading={"Media Experience"} content={
                                    <>
                                        {data.media_experience?.length > 0 ? data.media_experience.join(', ') : ''}
                                    </>}
                                />
                            )}
                            {data?.employment_type?.length > 0 && (
                                <Item icon={<TimeIcon size={12} />} heading={"Type of Work"} content={
                                    <>
                                        {data.employment_type?.length > 0 ? data.employment_type.join(', ') : ''}
                                    </>}
                                />
                            )}
                            {data?.character_strengths?.length > 0 && (
                                <Item icon={<FaStarSvg size={12} />} heading={"Strengths"} content={
                                    <>
                                        {data.character_strengths?.length > 0 ? data.character_strengths.join(', ') : ''}
                                    </>}
                                />
                            )}
                        </View >
                    </>
                );
            };

            const Video = () => {
                return (
                    <>

                    </>
                );
            };

            const Resume = () => {
                return (
                    <>

                    </>
                );
            };

            return (
                <>
                    <View style={[styles.flexCols, styles.contentRight]}>
                        <CreativeDetails />
                        <Video />
                        <Resume />
                    </View>
                </>
            );
        };

        return (
            <>
                <View style={[styles.flexRows, styles.content]}>
                    <ContentLeft />
                    <ContentRight />
                </View>
            </>
        );
    };

    const Footer = () => {
        return (
            <>

            </>
        );
    };

    return (
        <>
            <Document
                title={filename}
                author={"Ad Agency Creatives"}
                subject={(data.name || "") + " - Creative Profile PDF - Ad Agency Creatives"}
            >
                <Page size="A4" style={styles.page}>
                    <Header />
                    <Content />
                    <Footer />
                </Page>
            </Document>
        </>
    );

}