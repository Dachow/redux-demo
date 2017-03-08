import { connect } from 'react-redux';
import Link from '../components/Link.jsx';
import { setVisibilityFilter } from '../actions';


// ownProps是什么？
// 本来是 Footer => Link
// 为了便于传递state
// Footer -> FilterLink -> Link
// ownProps本来为Footer为Link传递的参数，现在传递给FilterLink
// Link现在的参数来自FilterLink

const mapStateToProps = (state, ownProps) => ({
    active: ownProps.filter === state.visibilityFilter
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    onClick: () => {
        dispatch(setVisibilityFilter(ownProps.filter))
    }
})

const FilterLink = connect(
    mapStateToProps,
    mapDispatchToProps
)(Link)

export default FilterLink;
