import React from "react";

const defaultStyle = {height: '20px', width: '142px'};

export const SkeletonItem = (props: SkeletonItemProps) => {
    const {className, style} = props;

    return <div className={'skeleton-item '+className} style={{...defaultStyle, ...style}} />
};

type SkeletonItemProps = {
    className: string,
    style: {}
}
