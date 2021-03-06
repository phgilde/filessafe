"""empty message

Revision ID: f337605ffaf2
Revises: 2b4192c4dfab
Create Date: 2022-07-06 22:44:59.705920

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'f337605ffaf2'
down_revision = '2b4192c4dfab'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('file', sa.Column('filename_crypt', sa.String(length=255), nullable=True))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('file', 'filename_crypt')
    # ### end Alembic commands ###
