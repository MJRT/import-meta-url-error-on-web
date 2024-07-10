import { useEffect, useState } from 'react'

import { makeElectricContext } from 'electric-sql/react'
import { electrify } from 'electric-sql/pglite'
import { PGlite } from '@electric-sql/pglite'

import { authToken } from '../auth'
import { Electric, schema } from '../generated/client'

const { ElectricProvider, useElectric } = makeElectricContext<Electric>()

// We use a global database instance to avoid reinitializing the database
// when the component re-renders under React strict mode.
let db: PGlite

const scopedDbName = `idb://basic-notes.db`

const ElectricProviderComponent = ({
    children,
}: {
    children: React.ReactNode
}) => {
    const [electric, setElectric] = useState<Electric>()

    useEffect(() => {
        let isMounted = true

        const init = async () => {
            const config = {
                debug: true,
                url: 'localhost',
            }

            db ??= new PGlite(scopedDbName, {
                relaxedDurability: true,
            })
            const client = await electrify(db, schema, config)
            await client.connect(authToken())

            if (!isMounted) {
                return
            }

            setElectric(client)
        }

        const cleanup = async () => {
            if (electric) {
                await electric.close()
            }
        }

        init()

        return () => {
            cleanup()
            isMounted = false
        }
    }, [])

    if (electric === undefined) {
        return null
    }

    return <ElectricProvider db={electric}>{children}</ElectricProvider>
}

// eslint-disable-next-line react-refresh/only-export-components
export { ElectricProviderComponent as ElectricProvider, useElectric }