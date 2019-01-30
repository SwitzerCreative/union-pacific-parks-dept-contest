import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql } from 'gatsby'
import Layout from '../components/Layout'

export default class MainPage extends React.Component {
  render() {
    const { data } = this.props
    const { edges: posts } = data.allMarkdownRemark

    return (
      <Layout>
        <section className="section">
          <div className="container">
            <div className="content">
              <h1 className="has-text-weight-bold is-size-2">Photos!</h1>
            </div>
            {posts
              .map(({ node: post }) => (
                <div
                  className="content"
                  style={{ border: '1px solid #333', padding: '2em 4em' }}
                  key={post.id}
                >
                  <p>
                    <Link className="has-text-primary" to={post.fields.slug}>
                      {post.frontmatter.title} - {post.frontmatter.imageSource}
                    </Link>
                    <span> &bull; </span>
                    <small>{post.frontmatter.dateTaken}</small>
                  </p>
                  <p>
                    Here is where the excerpt was.
                    <br />
                    <br />
                    <Link className="button is-small" to={post.fields.slug}>
                      Keep Reading →
                    </Link>
                  </p>
                </div>
              ))}
          </div>
        </section>
      </Layout>
    )
  }
}

MainPage.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
}

export const pageQuery = graphql`
  query MainQuery {
    {
      allMarkdownRemark(
        sort: { order: DESC, fields: [frontmatter___date] },
        filter: { frontmatter: { templateKey: { eq: "photo-upload" } }}
      ) {
        edges {
          node {
            id
            fields {
              slug
            }
            frontmatter {
              title
              templateKey
              imageSource
              dateTaken(formatString: "MMMM DD, YYYY")
            }
          }
        }
      }
    }
  }
`
