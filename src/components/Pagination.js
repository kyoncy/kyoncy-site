import { Link } from "gatsby"
import React from "react"
import styles from '../styles/pagination.scss'

const Pagination = ({ props }) => {
	const { previousPagePath, nextPagePath } = props.pageContext;

	return (
		<div className={styles.pagination}>
			{previousPagePath ? <Link to={previousPagePath} className={styles.link}>← 前のページへ</Link> : null }
			{nextPagePath ? <Link to={nextPagePath} className={styles.link}>次のページへ →</Link> : null }
		</div>
	)
}

export default Pagination