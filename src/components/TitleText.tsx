import React from 'react'

function TitleText() {
    return (
        <div className="titleText">
            <h1>Canada PR Stats </h1>
            <div style={{
                display: 'flex'
            }}>
                <h3>
                    <a
                        href="https://www.canada.ca/en/immigration-refugees-citizenship/corporate/mandate/policies-operational-instructions-agreements/ministerial-instructions/express-entry-rounds.html#wb-auto-4"
                        target="_blank"
                    >
                        Data Source
                    </a>
                </h3>
                <h3>
                    <a
                        href="https://github.com/tmkasun/Canada-PR-statistics"
                        target="_blank"
                    >
                        Source Code
                    </a>
                </h3>
            </div>

        </div>
    )
}

export default TitleText