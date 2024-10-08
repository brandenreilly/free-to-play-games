"""empty message

Revision ID: 9553554bf01f
Revises: deb9da444e58
Create Date: 2024-08-09 18:51:40.946202

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '9553554bf01f'
down_revision = 'deb9da444e58'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('following', schema=None) as batch_op:
        batch_op.add_column(sa.Column('followed_id', sa.Integer(), nullable=False))
        batch_op.add_column(sa.Column('timestamp', sa.DateTime(), nullable=True))
        batch_op.create_foreign_key(None, 'user', ['followed_id'], ['id'])
        batch_op.drop_column('following_username')
        batch_op.drop_column('id')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('following', schema=None) as batch_op:
        batch_op.add_column(sa.Column('id', sa.INTEGER(), autoincrement=True, nullable=False))
        batch_op.add_column(sa.Column('following_username', sa.VARCHAR(length=255), autoincrement=False, nullable=False))
        batch_op.drop_constraint(None, type_='foreignkey')
        batch_op.drop_column('timestamp')
        batch_op.drop_column('followed_id')

    # ### end Alembic commands ###
