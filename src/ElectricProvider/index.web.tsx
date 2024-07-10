import { useEffect, useState } from 'react'


import { makeElectricContext } from 'electric-sql/react'
import { ElectricDatabase, electrify } from 'electric-sql/wa-sqlite'

import { authToken } from '../auth'
import { Electric, schema } from '../generated/client'

const { ElectricProvider, useElectric } = makeElectricContext<Electric>()
const scopedDbName = `basic-.db`

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

      const conn = await ElectricDatabase.init(scopedDbName)
      const client = await electrify(conn, schema, config)
      await client.connect(authToken())

      if (!isMounted) {
        return
      }

      setElectric(client)
    }

    init()

    return () => {
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