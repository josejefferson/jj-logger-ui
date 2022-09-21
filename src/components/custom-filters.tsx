import FormControl from '@mui/material/FormControl'
import FormGroup from '@mui/material/FormGroup'
import FormLabel from '@mui/material/FormLabel'
import Input from '@mui/material/Input'
import InputLabel from '@mui/material/InputLabel'
import { MUIDataTableColumnOptions } from 'mui-datatables'
import lang from '../utils/lang'

export const customDateFilter: MUIDataTableColumnOptions = {
	customFilterListOptions: {
		render: (value) => {
			if (value[0] && value[1]) {
				return [
					`${lang.filter.after}: ${new Date(value[0]).toLocaleString()}`,
					`${lang.filter.before}: ${new Date(value[1]).toLocaleString()}`
				]
			} else if (value[0]) {
				return `${lang.filter.after}: ${new Date(value[0]).toLocaleString()}`
			} else if (value[1]) {
				return `${lang.filter.before}: ${new Date(value[1]).toLocaleString()}`
			}
			return []
		},
		update: (filterList, filterPos, index) => {
			if (filterPos === 0) {
				filterList[index].splice(filterPos, 1, '')
			} else if (filterPos === 1) {
				filterList[index].splice(filterPos, 1)
			} else if (filterPos === -1) {
				filterList[index] = []
			}

			return filterList
		}
	},
	filterOptions: {
		names: [],
		logic(_value, filters, row: any) {
			let [after, before] = filters
			const date = new Date(row[0])

			if (after && before) {
				return !(date > new Date(after) && date < new Date(before))
			} else if (after) {
				return !(date > new Date(after))
			} else if (before) {
				return !(date < new Date(before))
			}

			return false
		},
		display: (filterList, onChange, index, column) => (
			<div>
				<FormLabel>{lang.filter.dateTime}</FormLabel>

				<FormGroup row>
					<FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
						<InputLabel shrink={true} htmlFor="filter-date-after">
							{lang.filter.after}
						</InputLabel>
						<Input
							id="filter-date-after"
							type="datetime-local"
							value={filterList[index][0] || ''}
							onChange={(event) => {
								filterList[index][0] = event.target.value
								onChange(filterList[index], index, column)
							}}
						/>
					</FormControl>

					<FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
						<InputLabel shrink={true} htmlFor="filter-date-before">
							{lang.filter.before}
						</InputLabel>
						<Input
							id="filter-date-before"
							type="datetime-local"
							value={filterList[index][1] || ''}
							onChange={(event) => {
								filterList[index][1] = event.target.value
								onChange(filterList[index], index, column)
							}}
						/>
					</FormControl>
				</FormGroup>
			</div>
		)
	}
}
