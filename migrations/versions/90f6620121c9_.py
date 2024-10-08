"""empty message

Revision ID: 90f6620121c9
Revises: df773e457fac
Create Date: 2024-07-26 19:02:17.958446

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '90f6620121c9'
down_revision = 'df773e457fac'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('favorites', schema=None) as batch_op:
        batch_op.add_column(sa.Column('game_id', sa.Integer(), nullable=True))
        batch_op.add_column(sa.Column('title', sa.String(length=250), nullable=True))
        batch_op.add_column(sa.Column('pic', sa.String(length=250), nullable=True))
        batch_op.add_column(sa.Column('url', sa.String(length=250), nullable=True))
        batch_op.add_column(sa.Column('genre', sa.String(length=250), nullable=True))
        batch_op.add_column(sa.Column('platform', sa.String(length=250), nullable=True))
        batch_op.add_column(sa.Column('developer', sa.String(length=250), nullable=True))
        batch_op.add_column(sa.Column('publisher', sa.String(length=250), nullable=True))
        batch_op.add_column(sa.Column('description', sa.String(length=250), nullable=True))
        batch_op.add_column(sa.Column('release_date', sa.String(length=250), nullable=True))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('favorites', schema=None) as batch_op:
        batch_op.drop_column('release_date')
        batch_op.drop_column('description')
        batch_op.drop_column('publisher')
        batch_op.drop_column('developer')
        batch_op.drop_column('platform')
        batch_op.drop_column('genre')
        batch_op.drop_column('url')
        batch_op.drop_column('pic')
        batch_op.drop_column('title')
        batch_op.drop_column('game_id')

    # ### end Alembic commands ###
