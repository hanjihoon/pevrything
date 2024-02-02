'use client'

import { ReactEventHandler } from "react"

type MoreContentsProps ={
    title: string
    contents: any
}

export default function MoreContents(props: MoreContentsProps): React.ReactElement {

    return(
        <div>
        <h2 className="mb-2 dark:text-gray-400 font-bold text-blue-600/75">{props.title}</h2>
            {props.contents && props.contents.map((content: any, i:any) => (
                <div key={i}>
                    <ul className="list-disc pl-5 text-gray-500 dark:text-gray-400">
                        <li>
                            <p>
                            {content.substring(content.indexOf("\n"))}
                            </p>
                        </li>
                    </ul>
                    <br/>
                </div>
            ))}
        </div>
    )
}