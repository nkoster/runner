import { stat } from 'fs'
import { useTypedSelector } from '../hooks/use-typed-selector'

const CellList: React.FC = () => {
    useTypedSelector(state => state)
    return (
        <>
            CellList
        </>
    )
}

export default CellList
